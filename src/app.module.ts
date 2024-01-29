import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { PagesModule } from './file/file.module';

@Module({
	imports: [OpenaiModule, ConfigModule.forRoot(), PagesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
