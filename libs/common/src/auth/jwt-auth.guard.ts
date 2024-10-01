import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from './services';

@Injectable()
export class JwtAuthGuard implements CanActivate { //can activate --> ve si la ruta se puede activar o no
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}
//--> se ve si sera una solicurd httpp o rabit
  canActivate(
    context: ExecutionContext, //Proporciona información sobre el contexto de ejecución de la solicitud
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context); //se obtiene el contexto de autenticacion desde la solicitud
    return this.authClient
      .send('validate_user', {
        Authentication: authentication, //mensaje al servicio de autenticación
      })
      .pipe(
        tap((res) => { // Si la validación es exitosa, se llama a addUser para añadir la información del usuario al contexto de la solicitud.
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) { // Este método se encarga de obtener el valor de autenticación del contexto de ejecución.
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication; //se obtiene el valor de autenticación del mensaje RPC.
    } else if (context.getType() === 'http') { //Si el tipo de contexto es http, se obtiene el valor de autenticación de las cookies de la solicitud HTTP.
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }
    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) { //añade el usuario validado al contexto de ejecución.
    if (context.getType() === 'rpc') { //se agrega el usuario al objeto de datos del mensaje RPC.
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') { //ñade el usuario al objeto de solicitud HTTP.
      context.switchToHttp().getRequest().user = user;
    }
  }
}


//El método canActivate determina si una solicitud está autenticada, utilizando el método getAuthentication para obtener el JWT y enviarlo al servicio de autenticación.
//Si el JWT es válido, el usuario se añade al contexto de la solicitud, permitiendo que otras partes de la aplicación accedan a la información del usuario. Si el JWT no es válido, se lanza una excepción de no autorizado.