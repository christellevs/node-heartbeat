import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatController } from './heartbeat.controller';

describe('HeartbeatService', () => {
  let service: HeartbeatService;

  const mockHeartbeatModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    })
      .overrideProvider(HeartbeatService)
      .useValue(mockHeartbeatModel)
      .compile();

    service = module.get<HeartbeatService>(HeartbeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
