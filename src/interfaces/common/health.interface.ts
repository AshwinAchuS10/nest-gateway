export interface IHealthCheckResponse {
    database: IDatabaseStatus;
    service: IServiceStatus;
}

interface IDatabaseStatus {
    status: string;
}

interface IServiceStatus {
    status: string;
}
