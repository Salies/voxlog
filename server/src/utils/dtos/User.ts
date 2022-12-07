import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserCreateIn {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
    message:
      'Username must only contain letters and numbers, beginning with a letter',
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
    message:
      'Username must only contain letters and numbers, beginning with a letter',
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

export type UserOut = {
  userId: string;
  username: string;
  email: string;
  birthdate: string;
  bio?: string;
  realName?: string;
  profilePictureUrl?: string;
  defaultTopArtistsRange: string;
  defaultTopAlbumsRange: string;
  defaultTopSongsRange: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRecentTracksOut = {
  scrobbleCreatedAt: Date;
  song: {
    songId: string;
    songTitle: string;
    coverArtUrl: string;
  };
  album: {
    coverArtUrl: string;
  };
  artist: {
    artistId: string;
    name: string;
  };
};
