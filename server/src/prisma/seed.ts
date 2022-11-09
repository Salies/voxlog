import { DaysRange, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const artistsToCreate = [
		{
			name: 'The Beatles',
			mbArtistId: 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d',
			artUrl: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
		},
		{
			name: 'The Rolling Stones',
			mbArtistId: 'b071f9fa-14b9-4b6e-8e9a-063e4f04ae73',
			artUrl: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
		},
	];

	const artists = await prisma.artist.createMany({
		data: artistsToCreate,
		skipDuplicates: true,
	});

	const albumsToCreate = [
		{
			title: 'Abbey Road',
			mbReleaseId: 'ffd6ebf5-10c1-3cca-915e-04c0aba926f3',
			artUrl: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
			artistId: artists[0].id,
		},
		// {
		// 	title: 'Let It Bleed',
		// 	mbReleaseId: 'a2151a7b-d584-3d93-9d7f-b72da6bbcaa0',
		// 	artUrl: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
		// 	artistId: artists[1].id,
		// },
	];

	const albums = await prisma.album.createMany({
		data: albumsToCreate,
		skipDuplicates: true,
	});

	const tracksToCreate = [
		{
			title: 'Come Together',
			mbRecordingId: '485bbe7f-d0f7-4ffe-8adb-0f1093dd2dbf',
			albumId: albums[0].id,
		},
		{
			title: 'Gimme Shelter',
			mbRecordingId: 'b8b3b8f0-8d0d-4b0f-8f6b-8e4c5c5e9f7b',
			albumId: albums[1].id,
		},
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
