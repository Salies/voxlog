import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ScrobbleModel {
	get = async (scrobble: any) => {
		return await prisma.scrobble.findUnique({
			where: {
				id: scrobble.id,
			},
		});
	};
}
