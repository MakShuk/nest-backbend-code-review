import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { PagesController } from './file.controller';

@Module({
	controllers: [PagesController],
	providers: [FileService],
})
export class PagesModule {}
