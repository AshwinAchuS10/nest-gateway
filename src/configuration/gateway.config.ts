import { Transport } from '@nestjs/microservices';

export class GatewayConfig {
  private readonly envConfig: { [key: string]: any } = {};

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;

    this.envConfig.managementService = {
      options: {
        port: process.env.MANAGEMENT_SERVICE_PORT,
        host: process.env.MANAGEMENT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };

    this.envConfig.mailerService = {
      options: {
        port: process.env.MAILER_SERVICE_PORT,
        host: process.env.MAILER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
