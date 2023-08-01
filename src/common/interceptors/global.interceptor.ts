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
export class GlobalInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // console.log('GLOBAL INTERCEPTOR', {
    //   context: context.getArgByIndex(0),
    //   next,
    // });
    logInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'INTERCEPTOR GLOBAL',
    );
    mutateInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'INTERCEPTOR GLOBAL',
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`After INTERCEPTOR GLOBAL... ${Date.now() - now}ms`),
        ),
      )
      .pipe(
        tap(() => {
          const res = context.switchToHttp().getResponse<FastifyReply>();
          res.header('JUNK', res.getHeader('JUNK') + ', INTERCEPTOR GLOBAL');
          res.header('INTERCEPTOR_GLOBAL', 'INTERCEPTOR GLOBAL');
        }),
      )
      .pipe(map((data) => (data + ', ' + 'INTERCEPTOR GLOBAL') as any));
    // .pipe(map((data) => ({ data: { interCept: data } } as any)));
  }
}
