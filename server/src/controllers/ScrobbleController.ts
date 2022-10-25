import { Request, Response } from 'express';
import ScrobbleModel from '../models/ScrobbleModel';

const scrobbleModel = new ScrobbleModel();

export default class UserController {
	post = async (req: Request, res: Response) => {
		const { track, artist, duration, username } = req.body;
		console.log(req.body);
		// const scrobble = await scrobbleModel.create(
		// 	username,
		// 	artist,
		// 	track,
		// 	timestamp,
		// );
		// res.json(scrobble);
		res.status(200).json({ message: 'Hello World!' });
	};
}
