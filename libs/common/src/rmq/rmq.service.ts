import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions { //devuelve datos de configuracion de RMQ -- resibe la cola q usara
    return {//por defecto noAck -> mensajes seran reconocidos de forma manual
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true, //mensajes persistentes -> sobreviven a reinicio del servidor
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef(); //referencia del canal de RabbitMQ.
    const originalMessage = context.getMessage(); // Obtiene el mensaje original 
    channel.ack(originalMessage); //marca el mnsj como reconocido
  }
}
