import { Request, Response } from "express";
import ScrobbleModel from "../models/ScrobbleModel";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { UserLoginIn } from "../utils/dtos/User";
import UserModel from "../models/UserModel";
import { User } from "@prisma/client";
import { compareHash } from "../utils/helpers";
import { generateToken, generateApiKey } from "../utils/auth";
import Levenshtein from "fast-levenshtein";

const scrobbleModel = new ScrobbleModel();
const userModel = new UserModel();

export default class UserController {
  create = async (req: Request, res: Response) => {
    try {
      let { track, artist, album, duration } = req.body;
      const userId = req.app.locals.username || "cla8ytn610004740kcfuzrk8z";

      const mbData = await this.queryForRecording(
        track,
        artist,
        album,
        duration
      );

      if (mbData) {
        const { song, artist, album } = mbData;
        const scrobble = await scrobbleModel.create({
          userId,
          song,
          artist,
          album,
        });
        res.status(201).json(scrobble);
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private queryForRecording = async (
    track: string,
    artist: string,
    album: string,
    duration: number
  ) => {
    try {
      let query = `http://musicbrainz.org/ws/2/recording?query=artist:${artist} AND recording:${track}`;
      const albumQuery = ` AND release:${album}`;
      query += album ? albumQuery : "";
      query += "&limit=1&offset=0&fmt=json";
      const { data } = await axios.get(query);
      const recording = data.recordings[0];

      // 10% of the duration is the threshold for a match
      // const threshold = duration * 0.1;
      // const recordingDuration = recording.length / 1000;
      // const durationDiff = Math.abs(recordingDuration - duration);
      // // console.log(recordingDuration, duration, threshold, durationDiff);
      // // if (durationDiff > threshold) throw new Error("Duration mismatch");

      // // Verify if the title is a near match
      // const recordingTitle = recording.title;
      // const titleDiff = Levenshtein.get(recordingTitle, track, {
      //   useCollator: true,
      // });
      // // if (titleDiff > 3) throw new Error("Title mismatch");
      // // Verify if the artist is a near match
      const artistName = recording["artist-credit"][0].artist.name;
      // const artistDiff = Levenshtein.get(artistName, artist, {
      //   useCollator: true,
      // });
      // // if (artistDiff > 3) throw new Error("Artist mismatch");

      // // Verify if the album is a near match
      const release = recording.releases[0];
      // const releaseTitle = release.title;
      // const releaseDiff = Levenshtein.get(releaseTitle, album, {
      //   useCollator: true,
      // });
      // if (releaseDiff > 3) throw new Error("Album mismatch");

      // query for the song and album CoverArt
      let coverArtUrl: string = undefined;
      try {
        const releaseGroupMbid = recording.releases[0]["release-group"].id;
        const coverArtQuery = `http://coverartarchive.org/release-group/${releaseGroupMbid}`;
        const { data: coverArtData } = await axios.get(coverArtQuery);
        coverArtUrl = coverArtData.images[0].thumbnails.small;
      } catch (error) {}

      const songMb = {
        mbRecordingId: recording.id,
        title: recording.title,
        durationInSeconds: recording.length / 1000,
        coverArtUrl,
      };

      const albumMb = {
        mbReleaseId: release.id,
        title: release.title,
        coverArtUrl: coverArtUrl,
      };

      const artistId = recording["artist-credit"][0].artist.id;
      const artistMb = { mbArtistId: artistId, name: artistName };
      return {
        song: songMb,
        album: albumMb,
        artist: artistMb,
      };
    } catch (error) {
      console.log("Failed to query MusicBrainz for recording", error);
      return null;
    }
  };

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userData = plainToInstance(UserLoginIn, req.body);

      // Verify if the password is valid
      const password = await userModel.getPassword(userData.username);
      const isPasswordValid = await compareHash(userData.password, password);
      if (isPasswordValid) {
        const token = await generateApiKey(userData.username);
        res.status(200).json({ token });
      }
      res.status(401).json({ error: "Invalid credentials" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
