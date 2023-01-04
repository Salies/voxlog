import { Request, Response } from 'express';
import { stringify } from 'superjson';
import * as scrobblesService from './service';
import { CreateScrobbleIn } from '../../utils/dtos/Scrobble';

export async function create(req: Request, res: Response) {
  try {
    const scrobble: CreateScrobbleIn = req.body;

    const createdScrobble = await scrobblesService.create(scrobble);

    if (createdScrobble) {
      return res.status(201).json(stringify(createdScrobble));
    } else {
      return res.status(400).json({ error: 'Scrobble already exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
