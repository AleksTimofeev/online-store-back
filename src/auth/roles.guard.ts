import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException, HttpStatus
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if(!requireRoles){
      return true
    }
    const request = context.switchToHttp().getRequest();
    try {
      const typeToken = request.headers.authorization.split(' ')[0]
      const token = request.headers.authorization.split(' ')[1];
      if (token && typeToken === 'Bearer') {
        const user = this.jwtService.verify(token);
        request.user = user
        return user.role.some(value => requireRoles.includes(value.role))
      }
    }catch (e) {
      throw new HttpException("У вас не достаточно прав.", HttpStatus.FORBIDDEN);
    }
  }
}