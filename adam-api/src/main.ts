import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  });

  await app.listen(3000);
}
bootstrap();