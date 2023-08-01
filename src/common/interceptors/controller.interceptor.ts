import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';
import { FastifyReply } from 'fastify';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ControllerInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // console.log('CONTROLLER INTERCEPTOR', { context, next });
    logInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'INTERCEPTOR CONTROLLER',
    );
    mutateInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'INTERCEPTOR CONTROLLER',
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`After INTERCEPTOR CONTROLLER... ${Date.now() - now}ms`),
        ),
      )
      .pipe(
        tap(() => {
          const res = context.switchToHttp().getResponse<FastifyReply>();
          res.header(
            'JUNK',
            res.getHeader('JUNK') + ', INTERCEPTOR CONTROLLER',
          );
          res.header('INTERCEPTOR_CONTROLLER', 'INTERCEPTOR CONTROLLER');
        }),
      )
      .pipe(map((data) => (data + ', ' + 'INTERCEPTOR CONTROLLER') as any));
  }
}
