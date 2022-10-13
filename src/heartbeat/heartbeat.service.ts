import { Injectable, NotFoundException } from '@nestjs/common';
import { Heartbeat } from './entities/heartbeat.entity';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HeartbeatService {
  constructor(
    @InjectModel('Heartbeat') private readonly heartbeatModel: Model<Heartbeat>,
  ) {}

  async findAllByGroup(group): Promise<Heartbeat[]> {
    return await this.heartbeatModel.find({ group: group });
  }

  async create(
    group: string,
    id: string,
    createHeartbeatDto: CreateHeartbeatDto,
  ): Promise<Heartbeat> {
    const query = { id: id, group: group };
    const update = {
      $set: {
        id: id,
        group: group,
        ...createHeartbeatDto,
        updatedAt: new Date(),
      },
    };
    const options = { upsert: true, new: true };

    return await this.heartbeatModel.findOneAndUpdate(query, update, options);
  }

  async delete(group: string, id: string): Promise<Heartbeat> {
    return await this.heartbeatModel.remove({
      group: group,
      id: id,
    });
  }
}
