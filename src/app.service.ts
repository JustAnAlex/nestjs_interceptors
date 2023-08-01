import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Hello World!');
    // throw new HttpException('bad errror', HttpStatus.BAD_REQUEST);
    return 'Hello World!';
  }

  injectedMethod() {
    console.log('injectedMethod');
    return 'injectedMethod';
  }
}
