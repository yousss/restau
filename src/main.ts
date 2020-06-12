import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


dotenv.config();

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
