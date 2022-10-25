import { PrismaClient, Scrobble } from '@prisma/client';

const prisma = new PrismaClient();

export default class ScrobbleModel {
	async create(scrobbleData: any): Promise<any> {
		const scrobble: Scrobble = await prisma.scrobble.create({
			data: {
				...scrobbleData,
			},
		});
		return scrobble;
	}

	// async getSimilarSongName(songName: string, artistName: string): Promise<any> {
	// 	const tokens = songName.split(' ');
	// 	const similarSongName: Scrobble = await prisma.song.findFirst({
	// 		// similar title to songName
	// 		where: {
	// 			title: {
	// 				search: 'a',
	// 			},
	// 		},
	// 		select: {
	// 			title: true,
	// 		},
	// 	});
	// 	return scrobble;
	// }
}
