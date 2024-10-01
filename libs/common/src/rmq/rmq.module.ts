import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  //buscamos configurar dinámicamente el modulo
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [ // --> permite importar otros módulos, en este caso se registra un cliente de microservicios para RabbitMQ.
        ClientsModule.registerAsync([
          {
            name, //  --> se utiliza el nombre especificado en las opciones para registrar el cliente de microservicio.
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`), //la cola se obtiene dinamicamente con el nombre enviado del cliente
              },
            }),
            inject: [ConfigService], 
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
