import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

@Injectable()
export class LoggerModuleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    logInfo(
      { body: req.body, query: req.query, headers: req.headers },
      'MIDLEWARE MODULE',
    );
    mutateInfo(
      { body: req.body, query: req.query, headers: req.headers },
      'MIDLEWARE MODULE',
    );

    // res.header('MIDLEWARE MODULE', 'MIDLEWARE MODULE');

    next();
  }
}
