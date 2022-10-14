import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable another server to access apis
  app.enableCors();
  // Generate OpenAPI docs to be served at `/api`
  const config = new DocumentBuilder()
    .setTitle('Node Heartbeat REST API')
    .setVersion('0.0.1')
    .addTag('node-heartbeat-rest-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
