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

  async create(heartbeat: Heartbeat): Promise<Heartbeat> {
    const newHeartbeat = new this.heartbeatModel(heartbeat);
    return await newHeartbeat.save();
  }
}
