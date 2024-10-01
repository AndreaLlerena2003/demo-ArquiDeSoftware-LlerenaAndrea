import { Controller, Post, Res, UseGuards } from '@nestjs/common'; //permite usar guards para proteger rutas
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //LocalAuthGuard asegura que el usuario esté autenticado usando una estrategia local con email y contraseña.
  @Post('login')
  async login(
    @CurrentUser() user: User, //obtiene el usuario luego de la autenticacion
    @Res({ passthrough: true }) response: Response, //passthrough: true permite que NestJS siga controlando la respuesta final incluso cuando se manipula el objeto de respuesta manualmente.
  ) {
    await this.authService.login(user, response); //Llama al servicio de autenticación para generar el JWT y enviarlo al cliente como una cookie.
    response.send(user); //Después de que el usuario inicie sesión con éxito, se envía la información del usuario como respuesta HTTP.
  }

  @UseGuards(JwtAuthGuard) //Verifica que el usuario tenga un token JWT válido antes de acceder a este endpoint.
  @MessagePattern('validate_user') // método será invocado cuando llegue un mensaje con ese patrón
  async validateUser(@CurrentUser() user: User) {//Recupera el usuario autenticado del JWT.
    return user; //retornar usuario autenticado
  }
}
