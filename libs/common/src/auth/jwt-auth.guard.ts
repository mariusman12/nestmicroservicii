import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/services";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Atuhentication
        if (!jwt){
            return false
        }
        return this.authClient.send<UserDto>('authenticate',{ // facem call la this.authClient.send si asta va trimite un mesaj catre authservice care se potriveste cu numele paternului curent adica cel creat in ruta
            Authentication:jwt // si urmatorul aprametru e data care il trimitem in mesaj
        }).pipe(
            tap((res) =>{// ne lasa sa executam un side effect of the incoming response 
                context.switchToHttp().getRequest().user = res;
            }),
            map(() => true),
            catchError(()=> of(false)),
        )
    }
}