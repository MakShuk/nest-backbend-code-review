import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
	openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	async main() {
		const completion = await this.openai.chat.completions.create({
			messages: [{ role: 'user', content: 'hi' }],
			model: 'gpt-3.5-turbo',
		});

		console.log(completion.choices);
		return completion;
	}
}
