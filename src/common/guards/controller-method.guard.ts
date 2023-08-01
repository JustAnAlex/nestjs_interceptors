import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Injectable()
export class ControllerMethodGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    logInfo(
      {
        body: context.getArgByIndex(0).body,
        query: context.getArgByIndex(0).query,
        headers: context.getArgByIndex(0).headers,
      },
      'GUARD CONTROLLER METHOD',
    );
    mutateInfo(
      {
        body: context.switchToHttp().getRequest().body,
        query: context.switchToHttp().getRequest().query,
        headers: context.switchToHttp().getRequest().headers,
      },
      'GUARD CONTROLLER METHOD',
    );

    const res = context.getArgByIndex(1);
    res.header('GUARD_CONTROLLER_METHOD', 'GUARD CONTROLLER METHOD');

    return true;
  }
}
