import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) { //imprimimos la data en billing -> para visualizar que si ha llegado la comunicaion al servicio
    this.logger.log('Billing...', data);
  }
}
