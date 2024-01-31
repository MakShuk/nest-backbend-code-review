import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import fs from 'fs';

const ROOT_FOLDER = 'development';

export interface IFolderAndFileName {
	fullUrl: string;
	file: string[];
}

@Injectable()
export class FileService {
	folderAndFileName: IFolderAndFileName[] = [];
	async getFile(path?: string): Promise<string> {
		const filePath = path || 'page.html';
		const finalPath = this.extractPathAfterDevelopment(filePath, ROOT_FOLDER);
		try {
			const data = await readFile(finalPath, 'utf8');
			return data;
		} catch (err) {
			console.error(`Error reading file ${finalPath}: ${err}`);
			return `Reading file ${finalPath}: ${err}`;
		}
	}
	async getAllFilesAndFolders(
		path: string,
	): Promise<{ content: string; error: boolean; data?: string[] }> {
		try {
			const data = await fs.promises.readdir(path);

			return { content: 'Получен список файлов и папок', error: false, data: data };
		} catch (err) {
			return { content: `getAllFilesAndFolders: ${err}`, error: true };
		}
	}

	async parsingFileAndFolderName(path: string): Promise<void | null> {
		function filterStringsByRegex(inputArray: string[], regex: RegExp): string[] {
			return inputArray.filter(str => regex.test(str));
		}

		function addTrailingSlash(str: string): string {
			if (str.slice(-1) !== '/') {
				return str + '/';
			}
			return str;
		}

		const onlyStringRegex: RegExp = /^[a-zA-Z-]+$/;
		const onlyDotRegex: RegExp = /\./;

		const dataStatus = await this.getAllFilesAndFolders(path);

		if (dataStatus.error || !dataStatus.data) {
			console.error(dataStatus.content);
			return null;
		}

		const folders = filterStringsByRegex(dataStatus.data, onlyStringRegex);
		const files = filterStringsByRegex(dataStatus.data, onlyDotRegex);
		const lastFolder = path.split('/').filter(Boolean).pop();

		if (lastFolder) this.folderAndFileName.push({ fullUrl: path, file: [...files] });

		for (const folder of folders) {
			console.log(folder);
			await this.parsingFileAndFolderName(addTrailingSlash(path) + folder + '/');
		}
	}

	async getFinalFolderAndFileObj(path: string): Promise<IFolderAndFileName[]> {
		this.folderAndFileName = [];
		const finalPath = this.extractPathAfterDevelopment(path, ROOT_FOLDER);
		await this.parsingFileAndFolderName(finalPath);
		return this.folderAndFileName;
	}

	private extractPathAfterDevelopment(inputPath: string, mainFolder: string): string {
		const inputPathReplaceSlash = inputPath.replace(/\\/g, '/');
		const developmentIndex = inputPathReplaceSlash.indexOf(mainFolder);
		if (developmentIndex !== -1) {
			const extractedPath = inputPathReplaceSlash.substring(developmentIndex + mainFolder.length);
			const cleanedPath = extractedPath.replace(/^[/\\]+/, '');
			return `/opt/app/data/${cleanedPath}`;
		} else {
			return inputPathReplaceSlash;
		}
	}
}
