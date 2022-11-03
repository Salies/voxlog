import { DaysRange, PrismaClient, User, Scrobble } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';
import { UserCreateIn, UserOut, UserProfileOut } from '../utils/dtos/User';
import { hashPassword, rangeToDays } from '../utils/helpers';

const prisma = new PrismaClient();

export default class UserModel {
	async create(userData: UserCreateIn): Promise<UserOut> {
		console.log(userData);
		const birthDate = new Date(userData.birthDate);
		const hashedPassword = await hashPassword(userData.password);
		const user = await prisma.user.create({
			data: {
				...userData,
				birthDate,
				password: hashedPassword,
			},
		});

		return this._formatUser(user);
	}

	async get(username: string): Promise<UserOut | null> {
		const user: User = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		return this._formatUser(user);
	}

	async getUserInfo(username: string): Promise<any | null> {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				username: true,

				profilePictureUrl: true,
				bio: true,
				realName: true,
				createdAt: true,
			},
		});
		return user;
	}

	async getTopSongs(username: string, rangeInDays: number): Promise<any[] | null> {
		if (!rangeInDays) {
			const { defaultTopSongsRange: range } = await prisma.user.findUnique({
				where: {
					username,
				},
				select: {
					defaultTopSongsRange: true,
				},
			});
			if (!range) return null;

			rangeInDays = rangeToDays(range);
		}

		const recentTopSongScrobbles = await prisma.scrobble.groupBy({
			by: ['songId'],
			where: {
				AND: [
					{
						createdAt: {
							gte: new Date(Date.now() - rangeInDays * 24 * 60 * 60 * 1000),
						},
					},
					{ user: { username } },
				],
			},
			_count: {
				songId: true,
			},
			orderBy: {
				_count: {
					songId: 'desc',
				},
			},
		});

		const recentTopSongs = await prisma.song.findMany({
			where: {
				songId: {
					in: recentTopSongScrobbles.map((scrobble) => scrobble.songId),
				},
			},
			select: {
				songId: true,
				title: true,
				duration: true,
				coverArtUrl: true,
				album: {
					select: {
						artist: {
							select: {
								name: true,
							},
						},
						title: true,
					},
				},
			},
		});
		return recentTopSongs;
		// const recentTopSongsWithCount = songAndCount.map((scrobble) => {
		// 	const song = recentTopSongs.find((song) => song.songId === scrobble.songId);
		// 	return {
		// 		songId: song.songId,
		// 		title: song.title,
		// 		duration: song.duration,
		// 		coverArtUrl: song.coverArtUrl,
		// 		artist: song.album.artist.name,
		// 		album: song.album.title,
		// 		count: scrobble.count,
		// 	};
		// });
		// return recentTopSongsWithCount;
	}

	async getPassword(username: string): Promise<string> {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				password: true,
			},
		});
		return user?.password || '';
	}

	_formatUser(user: User): UserOut {
		const userOut: UserOut = {
			username: user.username,
			email: user.email,
			birthdate: user.birthDate.toISOString(),
			bio: user.bio,
			realName: user.realName,
			createdAt: user.createdAt.toISOString(),
		};
		return userOut;
	}
}
