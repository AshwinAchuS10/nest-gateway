import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ManagementServiceController } from '../controllers/management.service.controller';


import { GatewayConfig } from '../configuration/gateway.config';
import { HealthController } from '../controllers/health.controller';

@Module({
  imports: [],
  controllers: [ManagementServiceController, HealthController],
  providers: [
    GatewayConfig,
    {
      provide: 'MANAGEMENT_SERVICE',
      useFactory: (gatewayConfig: GatewayConfig) => {
        const managementServiceOptions = gatewayConfig.get('managementService');
        return ClientProxyFactory.create(managementServiceOptions);
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
