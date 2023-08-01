import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Injectable()
export class GlobalPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    // console.log({ value });
    // console.log({ metadata });
    console.log('PIPE GLOBAL' + metadata.type);

    logInfo(
      {
        body: value,
      },
      'PIPE GLOBAL',
    );
    mutateInfo(
      {
        body: value,
      },
      'PIPE GLOBAL',
    );

    // value.junk = value.junk + ', GLOBAL PIPE';

    return value;
  }
}
