import { sanitize } from 'class-sanitizer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';

const validationMiddleware = (type: any, dataIn: any): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const errors = [];
		const data = plainToInstance(type, dataIn);
		sanitize(data);

		const validationErrors = await validate(data, {
			skipMissingProperties: false,
			whitelist: true,
			forbidNonWhitelisted: true,
		});

		if (validationErrors.length > 0) {
			validationErrors.forEach((error) => {
				const constraints = Object.values(error.constraints);
				errors.push(...constraints);
			});
			res.status(400).json({ errors });
		} else {
			next();
		}
	};
};

const validateBody = (type: any): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		validationMiddleware(type, req.body)(req, res, next);
	};
};

const validateQuery = (type: any): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		validationMiddleware(type, req.query)(req, res, next);
	};
};
const validateParams = (type: any): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		validationMiddleware(type, req.params)(req, res, next);
	};
};

export { validateBody, validateQuery, validateParams };
