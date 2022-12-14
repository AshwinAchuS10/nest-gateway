import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from '../controllers/users.controller';


import { GatewayConfig } from '../config/gateway.config';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    GatewayConfig,
    {
      provide: 'USER_SERVICE',
      useFactory: (gatewayConfig: GatewayConfig) => {
        const userServiceOptions = gatewayConfig.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [GatewayConfig],
    },
  ],
})
export class AppModule { }
