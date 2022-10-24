import jwt from 'jsonwebtoken';

export const generateToken = (username: string) => {
	return jwt.sign({ username }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

export const invalidateToken = (token: string) => {
	return jwt.destroy(token);
};
