import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply } from 'fastify';
import { ControllerFilter } from './common/filters/controller.filter';
import { ControllerMethodFilter } from './common/filters/controller-method.filter';
import { ControllerPipe } from './common/pipes/controller.pipe';
import { ControllerGuard } from './common/guards/controller.guard';
import { ControllerInterceptor } from './common/interceptors/controller.interceptor';
import { ControllerParameterPipe } from './common/pipes/controller-parameter.pipe';
import { ControllerMethodGuard } from './common/guards/controller-method.guard';
import { ControllerMethodInterceptor } from './common/interceptors/controller-method.interceptor';
import { ControllerMethodPipe } from './common/pipes/controller-method.pipe';

@UseFilters(ControllerFilter)
@UsePipes(new ControllerPipe())
@UseGuards(ControllerGuard)
@UseInterceptors(new ControllerInterceptor())
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Body(new ControllerParameterPipe()) body: any,
    @Query(new ControllerParameterPipe()) query: any,
    @Headers() headers: any,
  ): string {
    console.log('--------------------');
    console.log('body', body?.junk);
    console.log('query', query?.junk);
    console.log('headers', headers?.junk);
    console.log('--------------------');

    return this.appService.getHello();
  }

  @UseFilters(ControllerMethodFilter)
  @UseGuards(ControllerMethodGuard)
  @UseInterceptors(new ControllerMethodInterceptor())
  @Post()
  @UsePipes(new ControllerMethodPipe())
  getHello_2(
    @Body(new ControllerParameterPipe()) body: any,
    @Query(new ControllerParameterPipe()) query: any,
    @Headers() headers: any,
    // @Res() reply: FastifyReply,
  ): any {
    console.log('--------------------');
    console.log('body', body?.junk);
    console.log('query', query?.junk);
    console.log('headers', headers?.junk);
    console.log('--------------------');

    // сам сравни эти два варианта
    // reply.header('JUNK', reply.getHeader('JUNK') ?? '' + ', RAW HEADER');
    // reply.send(this.appService.getHello());

    // сам сравни эти два варианта
    return this.appService.getHello();
  }
}
