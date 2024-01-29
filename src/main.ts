import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const port = 3333;
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ['http://127.0.0.1:5500'],
		methods: ['GET', 'POST'],
		credentials: true,
	});
	await app.listen(port);
	console.log(`update-service запущен на ${port} порту`);
}
bootstrap();
