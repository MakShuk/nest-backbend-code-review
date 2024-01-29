import { Controller, Get, Query } from '@nestjs/common';
import { FileService, IFolderAndFileName } from './file.service';

@Controller('content')
export class PagesController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	async getHTMLPage(): Promise<string> {
		return await this.fileService.getFile();
	}

	@Get('file')
	async findAll(@Query() data: { path: string }): Promise<string> {
		console.log('Received cat data:', data.path.replace(/\\/g, '/'));
		return await this.fileService.getFile(data.path.replace(/\\/g, '/'));
	}

	@Get('folder')
	async findFolderAndFile(@Query() data: { path: string }): Promise<void> {
		await this.fileService.getAllFilesAndFolders(data.path.replace(/\\/g, '/'));
	}

	@Get('all')
	async getAllFileAndFolder(@Query() data: { path: string }): Promise<IFolderAndFileName[]> {
		return await this.fileService.getFinalFolderAndFileObj(data.path.replace(/\\/g, '/'));
	}
}
