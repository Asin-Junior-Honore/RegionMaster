import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    console.log('Token:', token);

    if (!token) {
      console.log('Token is missing')
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      const user = this.jwtService.verify(token);
      request.user = user;
      console.log('User:', user);
      return true;
    } catch (error) {
      console.log('Token verification error:', error); // Debugging
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
