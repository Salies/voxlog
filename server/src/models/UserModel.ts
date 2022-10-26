import { DaysRange, PrismaClient, User, Scrobble } from '@prisma/client';
import { UserCreateIn, UserOut, UserProfileOut } from '../utils/dtos/User';
import { hashPassword } from '../utils/helpers';

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
				profilePictureUrl: true,
				bio: true,
				realName: true,
				defaultTopArtistsRange: true,
				defaultTopAlbumsRange: true,
				defaultTopSongsRange: true,
				createdAt: true,
				eventsAttending: {
					select: {
						event: {
							select: {
								eventId: true,
								name: true,
								pluscode: true,
								startTime: true,
							},
						},
					},
				},
			},
		});

		if (!user) return null;
		const defaultTopArtistsRange = this.rangeToDays(user.defaultTopArtistsRange);
		const defaultTopAlbumsRange = this.rangeToDays(user.defaultTopAlbumsRange);
		const defaultTopSongsRange = this.rangeToDays(user.defaultTopSongsRange);
		const greatestRange = Math.max(defaultTopArtistsRange, defaultTopAlbumsRange, defaultTopSongsRange);

		const recentScrobbles = await prisma.scrobble.groupBy({
			by: ['songId'],
			where: {
				AND: [
					{
						createdAt: {
							gte: new Date(Date.now() - greatestRange * 24 * 60 * 60 * 1000),
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

		return recentScrobbles;
	}

	rangeToDays(range: DaysRange): number {
		switch (range.toString()) {
			case 'SEVEN':
				return 7;
			case 'THIRTY':
				return 30;
			case 'NINETY':
				return 90;
			case 'ONE_EIGHTY':
				return 180;
			case 'THREE_SIXTY':
				return 365;
			default:
				return 0;
		}
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
