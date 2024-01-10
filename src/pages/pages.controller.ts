import { Controller, Get, Query } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('page')
export class PagesController {
	constructor(private readonly pagesService: PagesService) {}

	@Get()
	async getHTMLPage(): Promise<string> {
		return await this.pagesService.getFile();
	}

	@Get('file')
	async findAll(@Query() data: { path: string }): Promise<string> {
		console.log('Received cat data:', data.path.replace(/\\/g, '/'));
		return await this.pagesService.getFile(data.path.replace(/\\/g, '/'));
	}
}
