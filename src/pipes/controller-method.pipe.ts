import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Injectable()
export class ControllerMethodPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    // console.log({ value });
    // console.log({ metadata });
    console.log('PIPE CONTROLLER METHOD' + metadata.type);
    // console.log('CONTROLLER PIPE', value.junk);
    // value.junk = value.junk + ', CONTROLLER PIPE';

    logInfo(
      {
        body: value,
      },
      'PIPE CONTROLLER METHOD',
    );
    mutateInfo(
      {
        body: value,
      },
      'PIPE CONTROLLER METHOD',
    );

    return value;
  }
}
