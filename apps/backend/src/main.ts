import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const PORT = process.env.PORT ?? 4000;
  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap();
