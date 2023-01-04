import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UserModel from '../../models/UserModel';
import { UserCreateIn, UserLoginIn } from '../../utils/dtos/User';
import { compareHash } from '../../utils/helpers';
import * as userService from './service';
import { generateToken, invalidateToken } from '../../utils/auth';
import { stringify } from 'superjson';

export async function login(req: Request, res: Response) {
  try {
    const userData = plainToInstance(UserLoginIn, req.body);

    const token = userService.validateLogin(userData);

    res.status(200).json({ token });

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    await userService.logout(req.app.locals.username);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const user: UserCreateIn = req.body;

    const createdUser = await userService.create(user);

    if (createdUser) {
      return res.status(201).json(stringify(createdUser));
    } else {
      return res.status(400).json({ error: 'User already exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { username } = req.params;

    const user = await userService.get(username);
    if (user) {
      return res.status(200).json(stringify(user));
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getCurrent(req: Request, res: Response) {
  try {
    const username = req.app.locals.username;

    const user = await userService.get(username);
    if (user) {
      return res.status(200).json(stringify(user));
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getStats(req: Request, res: Response) {
  try {
    const { username } = req.params;

    const stats = await userService.getListeningStats(username);

    return res.status(200).json({ stats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRecentScrobbles(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const quantity = parseInt(req.query.range as string, 10) || 10;

    const recentScrobbles = await userService.getRecentScrobbles(username, quantity);

    if (recentScrobbles) {
      return res.status(200).json(stringify(recentScrobbles));
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
