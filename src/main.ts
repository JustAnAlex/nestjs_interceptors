import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { GlobalFilter } from './common/filters/global.filter';
import { GlobalGuard } from './common/guards/global.guard';
import { GlobalInterceptor } from './common/interceptors/global.interceptor';
import { loggerGlobalMiddleware } from './common/middlewares/logger-global.middleware';
import { GlobalPipe } from './common/pipes/global.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  app.use(loggerGlobalMiddleware);
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalGuards(new GlobalGuard());
  app.useGlobalPipes(new GlobalPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
