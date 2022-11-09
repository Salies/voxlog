import { Request, Response } from "express";
import ScrobbleModel from "../models/ScrobbleModel";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { UserLoginIn } from "../utils/dtos/User";
import UserModel from "../models/UserModel";
import { User } from "@prisma/client";
import { compareHash } from "../utils/helpers";
import { generateToken, generateApiKey } from "../utils/auth";

const scrobbleModel = new ScrobbleModel();
const userModel = new UserModel();

export default class UserController {
  create = async (req: Request, res: Response) => {
    try {
      let { track, artist, album, duration } = req.body;
      const username = req.app.locals.username;
      console.log("track", track);
      console.log("artist", artist);
      console.log("album", album);
      console.log("duration", duration);
      // console.log('username', username);

      // Query MusicBrainz for the track's MBID'
      const mbid = this.queryForRecording(track, artist, album);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private queryForRecording = async (
    track: string,
    artist: string,
    album: string
  ) => {
    let query = `http://musicbrainz.org/ws/2/recording?query=artist:${artist} AND recording:${track}`;
    const albumQuery = ` AND release:${album}`;
    query += album ? albumQuery : "";
    query += "&limit=1&offset=0&fmt=json";
    const result = await axios.get(query);
    console.log("result", result);
    const recording = result.data.recordings[0];
    return recording.id;
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
