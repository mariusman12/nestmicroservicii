import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        configService:ConfigService, // injecatm configservice ca sa putem avea acces la ce e in .env
        private readonly userService: UsersService // injectam userService sa ne putem folosii de diferite metode 
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([ // asta practic va speicifa unde jwt din req se gaseste cu exactitate. 
                (request:any) =>   request?.cookies?.Authentication ||
                request?.Authentication ||
                request?.headers.Authentication,// pentru ca e cookie stim ca trebe sa o luam de aici 
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate( { userId } :TokenPayload ) { // luam userid pentru ca dupa ce jwt e decodat tokenul payload va fi atasat metodei validate
                                    // practic in auth service avem in tokenpayload userId
        return this.userService.getUser({_id: userId})

    }



}