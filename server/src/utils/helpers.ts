import * as bcrypt from 'bcrypt';
import { DaysRange } from '@prisma/client';
export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const compareHash = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};

export const daysToRange = (days: number) => {
	switch (days) {
		case 7:
			return DaysRange.Week;
		case 30:
			return DaysRange.Month;
		case 90:
			return DaysRange.Quarter;
		case 180:
			return DaysRange.HalfYear;
		case 365:
			return DaysRange.Year;
		default:
			return DaysRange.AllTime;
	}
};

export const rangeToDays = (range: DaysRange): number => {
	switch (range) {
		case DaysRange.Week:
			return 7;
		case DaysRange.Month:
			return 30;
		case DaysRange.Quarter:
			return 90;
		case DaysRange.HalfYear:
			return 180;
		case DaysRange.Year:
			return 365;
		default:
			return 7;
	}
};
