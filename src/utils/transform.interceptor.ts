import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>(); //get access to the response object
    const statusCode = response.statusCode ?? 200; // extract the status code from the response object
    return next.handle().pipe(map((data: T) => ({ statusCode, message: 'Success', data, })));
  }
}
