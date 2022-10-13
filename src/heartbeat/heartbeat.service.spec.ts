import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatController } from './heartbeat.controller';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { Meta } from './entities/meta.entity';

describe('HeartbeatService', () => {
  let service: HeartbeatService;
  let meta: Meta = { foo: '1' };
  let dto: CreateHeartbeatDto = { meta: meta };
  let id: string = '123-123';
  let group: string = 'desperados';
  let instances: number = 1;

  const mockHeartbeatService = {
    create: jest.fn().mockImplementation((group, id, dto) =>
      Promise.resolve({
        id,
        group,
        ...dto,
      }),
    ),
    delete: jest.fn().mockImplementation((group, id) =>
      Promise.resolve({
        id,
        group,
        ...dto,
      }),
    ),
    findAllByGroup: jest.fn().mockImplementation((group) =>
      Promise.resolve([
        {
          id,
          group,
          ...dto,
        },
      ]),
    ),
    getSummary: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          group,
          instances,
        },
      ]),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    })
      .overrideProvider(HeartbeatService)
      .useValue(mockHeartbeatService)
      .compile();

    service = module.get<HeartbeatService>(HeartbeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a heartbeat', async () => {
    expect(await service.create(group, id, dto)).toEqual({
      id: '123-123',
      group: 'desperados',
      meta: { foo: '1' },
    });

    expect(mockHeartbeatService.create).toHaveBeenCalledWith(group, id, dto);
  });

  it('should get a heartbeat by group', async () => {
    expect(await service.findAllByGroup(group)).toEqual([
      {
        id: '123-123',
        group: 'desperados',
        meta: { foo: '1' },
      },
    ]);

    expect(mockHeartbeatService.findAllByGroup).toHaveBeenCalledWith(group);
  });

  it('should delete a heartbeat by group and id', async () => {
    expect(await service.delete(group, id)).toEqual({
      id: '123-123',
      group: 'desperados',
      meta: { foo: '1' },
    });

    expect(mockHeartbeatService.delete).toHaveBeenCalledWith(group, id);
  });

  it('should return groups summary', async () => {
    expect(await service.getSummary()).toEqual([
      {
        group: 'desperados',
        instances: 1,
      },
    ]);
  });
});
