export type UserCreateDTO = {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  bio: string;
  realname: string;
};

export type UserDTO = {
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
