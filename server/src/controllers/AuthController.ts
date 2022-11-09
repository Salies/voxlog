import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { UserCreateIn, UserLoginIn } from '../utils/dtos/User';
import { compareHash } from '../utils/helpers';
import { generateToken } from '../utils/auth';
const userModel = new UserModel();

export class AuthController {
	async login(req: Request, res: Response) {
		try {
			const userData = plainToInstance(UserLoginIn, req.body);

			// Verify if the password is valid
			const password = await userModel.getPassword(userData.username);
			const isPasswordValid = await compareHash(userData.password, password);
			if (isPasswordValid) {
				const token = await generateToken(userData.username);
				return res.status(200).json({ token });
			}

			res.status(401).json({ error: 'Invalid credentials' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}

	async get(req: Request, res: Response) {
		try {
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}
