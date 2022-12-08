import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './users.controller';


import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule { }
