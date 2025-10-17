import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:3003', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('NEXFLARE TECH API')
    .setDescription('Backend API for NEXFLARE TECH business website')
    .setVersion('1.0')
    .addTag('projects', 'Project management endpoints')
    .addTag('contact', 'Contact form endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 NEXFLARE TECH API is running on: http://localhost:${port}`);
  console.log(`📖 API Documentation: http://localhost:${port}/api`);
}

void bootstrap();
