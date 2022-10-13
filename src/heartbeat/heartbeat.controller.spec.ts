import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { Meta } from './entities/meta.entity';

describe('HeartbeatController', () => {
  let controller: HeartbeatController;
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    })
      .overrideProvider(HeartbeatService)
      .useValue(mockHeartbeatService)
      .compile();

    controller = module.get<HeartbeatController>(HeartbeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a heartbeat', () => {
    expect(controller.create(group, id, dto)).toEqual({
      id: '123-123',
      group: 'desperados',
      meta: { foo: '1' },
    });

    expect(mockHeartbeatService.create).toHaveBeenCalledWith(group, id, dto);
  });

  it('should get a heartbeat by group', () => {
    expect(controller.findAllByGroup(group)).toEqual([
      {
        id: '123-123',
        group: 'desperados',
        meta: { foo: '1' },
      },
    ]);

    expect(mockHeartbeatService.findAllByGroup).toHaveBeenCalledWith(group);
  });

  it('should delete a heartbeat by group and id', () => {
    expect(controller.delete(group, id)).toEqual({
      id: '123-123',
      group: 'desperados',
      meta: { foo: '1' },
    });

    expect(mockHeartbeatService.delete).toHaveBeenCalledWith(group, id);
  });

  it('should return groups summary', () => {
    expect(controller.summary()).toEqual([
      {
        group: 'desperados',
        instances: 1,
      },
    ]);
  });
});
