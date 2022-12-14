import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayConfig } from './config/gateway.config';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('users')
    .setVersion('1.0')
    .build();

  app.useGlobalInterceptors(new LoggingInterceptor());


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(new GatewayConfig().get('port'));
}

bootstrap();
