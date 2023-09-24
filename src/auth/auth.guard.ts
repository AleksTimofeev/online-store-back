import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const typeToken = request.headers.authorization.split(' ')[0]
      const token = request.headers.authorization.split(' ')[1];
      if (token && typeToken === 'Bearer') {
        request.user = this.jwtService.verify(token);
        return true;
      }
    }catch (e) {
      throw new UnauthorizedException("your are not authorized --AuthGuard--.");
    }
  }
}