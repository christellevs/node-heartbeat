import { Injectable, NotFoundException } from '@nestjs/common';
import { Heartbeat } from './entities/heartbeat.entity';
import { Group } from './entities/group.entity';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HeartbeatService {
  constructor(
    @InjectModel('Heartbeat') private readonly heartbeatModel: Model<Heartbeat>,
  ) {}

  public async findAllByGroup(group): Promise<Heartbeat[]> {
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

  public async delete(group: string, id: string): Promise<Heartbeat> {
    try {
      return await this.heartbeatModel.remove({
        group: group,
        id: id,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(
            `heartbeat in group: ${group} with ID: ${id} not found`,
          );
        }
      }
      throw err;
    }
  }

  public async getSummary(): Promise<Group[]> {
    try {
      var allGroups: Heartbeat[] = await this.findAllGroups();
      var uniqueGroups = allGroups.map((g) => g.group);
      uniqueGroups = [...new Set(uniqueGroups)];

      var result = await Promise.all(
        uniqueGroups.map(async (group) => {
          const instances = await this.findGroupInstances(group);
          const firstHeartbeat = await this.getSortedCreatedAt(group);
          const latestHeartbeat = await this.getSortedUpdatedAt(group);

          if (instances > 0) {
            return {
              group: group,
              instances: instances.toString(),
              createdAt: firstHeartbeat.map((beat) => beat.createdAt)[0],
              lastUpdatedAt: latestHeartbeat.map((beat) => beat.updatedAt)[0],
            };
          }
        }),
      );
      return result;
    } catch (e) {
      throw new Error(`Unable to get groups summary: ${e}`);
    }
  }

  private async findGroupInstances(group: string): Promise<number> {
    return await this.heartbeatModel.find({ group: group }).count();
  }

  private async getSortedCreatedAt(group: string): Promise<Heartbeat[]> {
    return await this.heartbeatModel
      .find({ group: group })
      .sort({ createdAt: 1 });
  }

  private async getSortedUpdatedAt(group: string): Promise<Heartbeat[]> {
    return await this.heartbeatModel
      .find({ group: group })
      .sort({ updatedAt: -1 });
  }

  private async findAllGroups(): Promise<Heartbeat[]> {
    return await this.heartbeatModel.find();
  }
}
