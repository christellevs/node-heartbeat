import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HeartbeatModule } from './../src/heartbeat/heartbeat.module';
import { HeartbeatController } from './../src/heartbeat/heartbeat.controller';
import { HeartbeatService } from './../src/heartbeat/heartbeat.service';
import { CreateHeartbeatDto } from './../src/heartbeat/dto/create-hearbeat.dto';
import { Meta } from './../src/heartbeat/entities/meta.entity';

describe('AppController (e2e)', () => {
  let heartbeat: INestApplication;

  let meta: Meta = { foo: '1' };
  let dto: CreateHeartbeatDto = { meta: meta };
  let id: string = '123-123';
  let group: string = 'desperados';
  let instances: number = 1;

  const mockHeartbeatService = {
    create: jest.fn((group, id, dto) => {
      return {
        id,
        group,
        ...dto,
      };
    }),
    delete: jest.fn((group, id) => {
      return {
        id,
        group,
        ...dto,
      };
    }),
    findAllByGroup: jest.fn((group) => {
      return [
        {
          id,
          group,
          ...dto,
        },
      ];
    }),
    getSummary: jest.fn(() => {
      return [
        {
          group,
          instances,
        },
      ];
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HeartbeatModule],
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    })
      .overrideProvider(HeartbeatService)
      .useValue(mockHeartbeatService)
      .compile();

    heartbeat = moduleFixture.createNestApplication();
    await heartbeat.init();
  });

  it('/ (GET)', () => {
    return request(heartbeat.getHttpServer()).get('/').expect(200);
  });
});
