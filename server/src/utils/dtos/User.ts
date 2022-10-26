import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UserCreateIn {
	@IsNotEmpty()
	@IsString()
	@Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
		message: 'Username must only contain letters and numbers, beginning with a letter',
	})
	username: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 255)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
		message:
			'Password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter, and one special character',
	})
	password: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsDateString()
	birthDate: string;

	@IsOptional()
	@IsString()
	@Length(0, 160)
	bio?: string;

	@IsOptional()
	@IsString()
	@Length(0, 64)
	realName?: string;
}

export class UserLoginIn {
	@IsNotEmpty()
	@IsString()
	@Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
		message: 'Username must only contain letters and numbers, beginning with a letter',
	})
	username: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 255)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
		message:
			'Password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter, and one special character',
	})
	password: string;
}

export class UserOut {
	username: string;
	email: string;
	birthdate: string;
	createdAt: string;
	bio?: string;
	realName?: string;
}

export class UserHeaderOut {
	username: string;
	profilePictureUrl?: string;
	realName?: string;
	bio?: string;
	totalArtists: number;
	totalAlbums: number;
	totalSongs: number;
	totalHours: number;
}

export class UserRankingOut {
	topArtists: ArtistCardOut[];
	topAlbums: AlbumCardOut[];
	topSongs: SongCardOut[];
}

export class ArtistCardOut {
	artistName: string;
	artistPictureUrl?: string;
	artistProfileUrl: string;
}

export class AlbumCardOut {
	albumName: string;
	albumPictureUrl?: string;
	albumProfileUrl: string;
}

export class SongCardOut {
	songName: string;
	songPictureUrl?: string;
	songProfileUrl: string;
}

export class EventCardOut {
	artistName: string;
	date: string;
	location: string;
}
export class UserProfileOut {
	headerInfo: UserHeaderOut;
	rankingInfo: UserRankingOut;
	recentTracks: SongCardOut[];
	recentEvents: EventCardOut[];
}
