import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schemas/user.schema';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService, //injectamos el jwt service de nest
  ) {}

  async login(user: User, response: Response) { //de u objeto usuario -> armarmos token payload conn el id to hex
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(), //lo convertimos a cadena hexa -> ya mongo su _id nos dara un objeto ObjectId
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    ); //se modifica la expiracion sumando el tiempo configurado en el env

    const token = this.jwtService.sign(tokenPayload); //firmamos con el token obtenido -> token tiene nuesto _id del user

    response.cookie('Authentication', token, { //e envia cookie al cliente
      httpOnly: true, //no sera accesible desde js
      expires, //configuracion de la duracion de la cookie calculada
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', { //para logout se envia cookie vacia
      httpOnly: true,
      expires: new Date(), //se manda con fecha de expiraion inmediata para invalidarla
    });
  }
}
