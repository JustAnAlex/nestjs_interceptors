import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Injectable()
export class GlobalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    logInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'GUARD GLOBAL',
    );
    mutateInfo(
      {
        body: context.switchToHttp().getRequest().body,
        query: context.switchToHttp().getRequest().query,
        headers: context.switchToHttp().getRequest().headers,
      },
      'GUARD GLOBAL',
    );

    const res = context.getArgByIndex(1);
    res.header('GUARD_GLOBAL', 'GUARD GLOBAL');

    return true;
  }
}
