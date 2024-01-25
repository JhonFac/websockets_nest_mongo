import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INIT } from './variables';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

console.log(INIT);
console.log(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Your App Name')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('your_tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
