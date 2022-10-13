import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb://cooluser:123456@localhost:27017/mongonest', // TODO add env rather than hardcode
        },
      },
    });
  }
}
