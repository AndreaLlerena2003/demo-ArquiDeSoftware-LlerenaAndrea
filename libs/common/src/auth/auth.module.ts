import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'; //analiza cookies en las solicitudes HTTP
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from './services';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })], //configura para que travaje con auth
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { //se está aplicando el middleware cookieParser() a todas las rutas de la aplicación
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
