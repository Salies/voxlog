import { PrismaClient, User } from '@prisma/client';
import { UserCreateIn, UserOut } from '../utils/dtos/User';
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
