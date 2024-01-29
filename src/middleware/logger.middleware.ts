import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	use(req: Request, _res: Response, next: NextFunction) {
		console.log(`Request: ${req.method} ${req.url}`);
		next();
	}
}
