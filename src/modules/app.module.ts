import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from '../controllers/users.controller';


import { GatewayConfig } from '../config/gateway.config';
import { HealthController } from '../controllers/health.controller';

@Module({
  imports: [],
  controllers: [UsersController, HealthController],
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
    {
      provide: 'MAIL_SERVICE',
      useFactory: (gatewayConfig: GatewayConfig) => {
        const mailerServiceOptions = gatewayConfig.get('mailerService');
        return ClientProxyFactory.create(mailerServiceOptions);
      },
      inject: [GatewayConfig],
    },
  ],
})
export class AppModule { }
