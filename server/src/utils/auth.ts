import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_API_SECRET = process.env.JWT_API_SECRET || '';

export const generateToken = (username: string) => {
	return jwt.sign({ username }, JWT_SECRET, {
		expiresIn: '7d',
	});
};

export const generateApiKey = (username: string) => {
	return jwt.sign({ username }, JWT_API_SECRET);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

export const invalidateToken = (token: string) => {
	return jwt.destroy(token);
};
