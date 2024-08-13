import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class BigIntService {

  serialize(data: any) {
    const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
      return typeof value === 'bigint' ? parseInt(value.toString()) : value;
  }));
  return serializedData;
  }
}