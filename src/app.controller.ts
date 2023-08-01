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
import { ControllerInterceptor } from './interceptors/controller.interceptor';
import { ControllerMethodInterceptor } from './interceptors/controller-method.interceptor';
import { ControllerGuard } from './guards/controller.guard';
import { ControllerMethodGuard } from './guards/controller-method.guard';
import { ControllerPipe } from './pipes/controller.pipe';
import { ControllerMethodPipe } from './pipes/controller-method.pipe';
import { ControllerParameterPipe } from './pipes/controller-parameter.pipe';
import { FastifyReply } from 'fastify';
import { ControllerFilter } from './filters/controller.filter';
import { ControllerMethodFilter } from './filters/controller-method.filter';

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

    // reply.header('JUNK', reply.getHeader('JUNK') ?? '' + ', RAW HEADER');
    // reply.send(this.appService.getHello());

    return this.appService.getHello();
  }
}
