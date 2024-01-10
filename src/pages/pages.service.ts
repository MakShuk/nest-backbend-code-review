import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';

@Injectable()
export class PagesService {
	async getFile(path?: string): Promise<string> {
		const filePath = path || 'page.html';
		try {
			const data = await readFile(filePath, 'utf8');
			return data;
		} catch (err) {
			console.error(`Error reading file ${filePath}: ${err}`);
			return `Error reading file ${filePath}: ${err}`;
		}
	}
}
