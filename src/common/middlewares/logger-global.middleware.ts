import { Request, Response, NextFunction } from 'express';
import { logInfo } from 'src/helpers/log-helper';
import { mutateInfo } from 'src/helpers/mutate-helper';

export const loggerGlobalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logInfo(
    { body: req.body, query: req.query, headers: req.headers },
    'MIDLEWARE GLOBAL',
  );
  mutateInfo(
    { body: req.body, query: req.query, headers: req.headers },
    'MIDLEWARE GLOBAL',
  );

  // res.header('MIDLEWARE GLOBAL', 'MIDLEWARE GLOBAL');

  next();
};
