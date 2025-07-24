import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import 'dotenv/config';

async function bootstrap() {
  console.log('🚀 Ứng dụng đang khởi động...');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('✅ NestJS app đã được tạo');
  
  // Create uploads directory if it doesn't exist
  const uploadDir = 'uploads';
  const employeeProfileDir = path.join(uploadDir, 'employeeProfile');
  const projectImageDir = path.join(uploadDir, 'projectImage');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`📂 Created directory: ${uploadDir}`);
  }

  if (!fs.existsSync(employeeProfileDir)) {
    fs.mkdirSync(employeeProfileDir);
    console.log(`📂 Created directory: ${employeeProfileDir}`);
  }
  if (!fs.existsSync(projectImageDir)) {
    fs.mkdirSync(projectImageDir);
    console.log(`📂 Created directory: ${projectImageDir}`);
  }


  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Serve static files from the uploads directory
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  console.log('📂 Serving static files from: uploads');

  await app.listen(3000);
  console.log('🚀 Server is running on ${process.env.NEXT_PUBLIC_API}');
}

bootstrap();