import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors();
  await app.listen(process.env.PORT, () => console.log(`Server started successfully on PORT ${process.env.PORT}`));

}
bootstrap();
