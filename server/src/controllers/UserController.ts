import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { UserCreateIn } from '../utils/dtos/User';

const userModel = new UserModel();

export class UserController {
	async create(req: Request, res: Response): Promise<void> {
		try {
			const userData: UserCreateIn = req.body;
			const user = await userModel.create(userData);
			res.status(201).json(user);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}

	async get(req: Request, res: Response): Promise<void> {
		try {
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}
