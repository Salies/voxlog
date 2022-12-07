import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { UserCreateIn } from '../utils/dtos/User';
import { stringify } from 'superjson';

const userModel = new UserModel();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const userData: UserCreateIn = req.body;

      const user = await userModel.create(userData);
      if (!user) return res.status(400).json({ error: 'User already exists' });

      const stringifiedUser = stringify(user);
      res.status(201).json(stringifiedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const user = await userModel.get(username);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const stringifiedUser = stringify(user);
      res.status(200).json(stringifiedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getCurrent(req: Request, res: Response) {
    try {
      const username = req.app.locals.username;

      const user = await userModel.get(username);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const stringifiedUser = stringify(user);
      res.status(200).json(stringifiedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const totalHours = await userModel.getTotalHours(username);

      // const stringifiedTotalHours = stringify(totalHours);

      return res.status(200).json({ totalHours });
      // if (totalHours)
      // else res.status(404).json({ error: 'User not found' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getRecentTracks(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const { range: rangeString } = req.query;
      const range = parseInt(rangeString as string) || 10;
      const recentTracks = await userModel.getRecentScrobbles(username, range);
      if (!recentTracks)
        return res.status(404).json({ error: 'User not found' });

      const stringifiedRecentTracks = stringify(recentTracks);
      return res.status(200).json(stringifiedRecentTracks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // async getTopSongs(req: Request, res: Response) {
  //   try {
  //     const { username } = req.params;
  //     const { range: rangeString } = req.query;
  //     const range = parseInt(rangeString as string);
  //     const topSongs = await userModel.getTopSongs(username, range);

  //     if (topSongs) res.status(200).json(topSongs);
  //     else res.status(404).json({ error: 'User not found' });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
}
