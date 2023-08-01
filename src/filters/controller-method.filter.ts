import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Catch()
export class ControllerMethodFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // console.log({ exception, host });

    logInfo(
      {
        body: host.getArgByIndex(0).body,
        query: host.getArgByIndex(0).query,
        headers: host.getArgByIndex(0).headers,
      },
      'FILTER CONTROLLER METHOD',
    );
    mutateInfo(
      {
        body: host.switchToHttp().getRequest().body,
        query: host.switchToHttp().getRequest().query,
        headers: host.switchToHttp().getRequest().headers,
      },
      'FILTER CONTROLLER METHOD',
    );

    const res = host.switchToHttp().getResponse();
    res.header('FILTER_CONTROLLER_METHOD', 'FILTER CONTROLLER METHOD');

    super.catch(exception, host);
  }
}
