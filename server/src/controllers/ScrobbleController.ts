import { Request, Response } from 'express';
import ScrobbleModel from '../models/ScrobbleModel';

const scrobbleModel = new ScrobbleModel();

export default class UserController {
	get = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const scrobble: any | null = await scrobbleModel.get(id);
			if (scrobble) {
				return res.send(scrobble);
			}
			return res.status(404).send('Scrobble not found');
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}
