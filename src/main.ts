import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
    }),
  );

  app.enableCors();
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');
  await app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`);
  });
}
bootstrap();
