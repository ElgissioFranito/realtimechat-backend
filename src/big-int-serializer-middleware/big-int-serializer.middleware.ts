import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class BigIntSerializerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const originalJson = res.json;
    res.json = function (body) {
      body = JSON.parse(JSON.stringify(body, (key, value) => 
        typeof value === 'bigint' ? parseInt(value.toString()) : value
      ));
      originalJson.call(this, body);
    };
    next();
  }
}
