import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayConfig } from 'configuration/gateway.config';
import { LoggingInterceptor } from 'middleware/logging.interceptor';
import { AppModule } from 'modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('categories')
    .setVersion('1.0')
    .build();

  app.useGlobalInterceptors(new LoggingInterceptor());


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(new GatewayConfig().get('port'));
}

bootstrap();
