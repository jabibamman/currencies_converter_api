import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DocService } from './doc.service';

async function runDocService() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const docService = app.get(DocService);

  await docService.generateMarkdownDocs();

  await app.close();
}

runDocService();
