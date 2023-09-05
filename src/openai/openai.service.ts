import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
	openai = new OpenAI({
		apiKey: 'my api key', // defaults to process.env["OPENAI_API_KEY"]
	});

	async main() {
		const completion = await this.openai.chat.completions.create({
			messages: [{ role: 'user', content: 'Say this is a test' }],
			model: 'gpt-3.5-turbo',
		});

		console.log(completion.choices);
	}
}
