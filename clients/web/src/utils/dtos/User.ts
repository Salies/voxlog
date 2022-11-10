export class UserCreateDTO {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  bio: string;
  realname: string;
}

export class UserDTO {
  username: string;
  realName: string;
  profilePictureUrl: string;
  bio: string;
}
