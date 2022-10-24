export class UserCreateIn {
	username: string;
	email: string;
	password: string;
	birthDate: string;
	bio?: string;
	realName?: string;
}

export class UserOut {
	username: string;
	email: string;
	birthdate: string;
	bio?: string;
	realName?: string;
}
