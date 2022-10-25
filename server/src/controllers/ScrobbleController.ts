import { Request, Response } from 'express';
import ScrobbleModel from '../models/ScrobbleModel';
import axios from 'axios';

const scrobbleModel = new ScrobbleModel();

export default class UserController {
	post = async (req: Request, res: Response) => {
		try {
			let { track, artist, album, duration, username } = req.body;

			// Query MusicBrainz for the track's MBID
			const basicQuery = `http://musicbrainz.org/ws/2/recording?query=artist:${artist} AND recording:${track}`;
			const albumQuery = ` AND release:${album}`;
			const query = (album ? basicQuery + albumQuery : basicQuery) + '&limit=1&offset=0&fmt=json';
			const { data } = await axios.get(query);

			// If the track is found, get the MBID
			let mbid = '';
			if (data.recordings.length > 0) {
				mbid = data.recordings[0].id;
			}

			// Create the scrobble
			const scrobble = await scrobbleModel.create({
				track,
				artist,
				album,
				duration,
				mbid,
				username,
			});
		} catch (error) {
			// console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	};
}
