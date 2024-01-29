import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { PagesModule } from './file/file.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
	imports: [OpenaiModule, ConfigModule.forRoot(), PagesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware) // Подключаем промежуточное программное обеспечение AuthMiddleware
			.forRoutes('*'); // Для всех маршрутов, начинающихся с '/private'
	}
}
