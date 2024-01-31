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
		return await this.fileService.getFile(data.path);
	}

	@Get('folder')
	async findFolderAndFile(@Query() data: { path: string }): Promise<void> {
		await this.fileService.getAllFilesAndFolders(data.path);
	}

	@Get('all')
	async getAllFileAndFolder(@Query() data: { path: string }): Promise<IFolderAndFileName[]> {
		return await this.fileService.getFinalFolderAndFileObj(data.path);
	}
}
