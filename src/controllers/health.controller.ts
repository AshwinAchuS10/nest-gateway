import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HealthCheck } from '@nestjs/terminus';
import { firstValueFrom } from 'rxjs';
import { IHealthCheckResponse } from 'domain/common/health.interface';

@Controller('health')
export class HealthController {
    constructor(
        @Inject('MANAGEMENT_SERVICE') private readonly managementServiceClient: ClientProxy,
        @Inject('MAIL_SERVICE') private readonly mailServiceClient: ClientProxy,
    ) { }

    @Get('users')
    @HealthCheck()
    async checkUserService() {
        let healthCheckResponse: IHealthCheckResponse = {} as IHealthCheckResponse;
        try {
            healthCheckResponse = await firstValueFrom(
                this.managementServiceClient.send('ping_management_service', {}),
            );
            return healthCheckResponse;
        } catch (error) {
            healthCheckResponse = {
                database: {
                    status: 'unreachable'
                },
                service: {
                    status: 'unreachable'
                }
            }
            return healthCheckResponse;
        }
    }

    @Get('mailers')
    @HealthCheck()
    async checkMailService() {
        let healthCheckResponse: IHealthCheckResponse = {} as IHealthCheckResponse;
        try {
            healthCheckResponse = await firstValueFrom(
                this.mailServiceClient.send('ping_mailer_service', {}),
            );
            return healthCheckResponse;
        } catch (error) {
            healthCheckResponse = {
                database: {
                    status: 'unreachable'
                },
                service: {
                    status: 'unreachable'
                }
            }
            return healthCheckResponse;
        }
    }
}