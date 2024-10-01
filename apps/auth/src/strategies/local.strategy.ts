import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' }); //en vez de username usaremos email
    //se espera que las credenciales se envíen como email y password.
  }

  async validate(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }
  //Passport llamará a este método automáticamente cuando un usuario intente autenticarse. 
}


//esta estrategia es comúnmente usada para autenticación en procesos 
//de inicio de sesión donde el usuario provee su correo electrónico (o nombre de usuario) y una contraseña.