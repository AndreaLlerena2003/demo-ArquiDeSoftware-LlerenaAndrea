import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy, //injectamos el cliente del microservicio billing
  ) {}

  async createOrder(request: CreateOrderRequest, authentication: string) {//solo si la insercion de la orden se realizo de forma correcta --> enviamos el evento al microservicio de billing
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session }); //creacion de la orden
      await lastValueFrom( //luego q se creo se envia el evento de la orden creada
        this.billingClient.emit('order_created', { //nombre del evento : order_created
          request, //enviamos la misma requet recibida como data
          Authentication: authentication,
        }),
      );
      await session.commitTransaction(); //si y solo si se envio bien el evento --> recien se guarda de forma completa la orden
      return order;
    } catch (err) {
      await session.abortTransaction(); //si sucede un error -> cancela la orden si algo va mal
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
