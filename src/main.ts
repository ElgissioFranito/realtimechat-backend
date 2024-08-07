import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntSerializerMiddleware } from './big-int-serializer-middleware/big-int-serializer.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();                   
  app.use(new BigIntSerializerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
