import { Request, Response } from 'express';
import ResourcesModel from '../models/ResourcesModel';
import { UserCreateIn } from '../utils/dtos/User';
import { plainToInstance } from 'class-transformer';

const resourcesModel = new ResourcesModel();

export default class ResourcesController {
	async getSongById(req: Request, res: Response) {
		try {
			const { songId } = req.params;
			const song = await resourcesModel.getSongById(songId);
			return res.status(200).json(song);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}
