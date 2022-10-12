import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Heartbeat } from './entities/heartbeat.entity';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  async createHeartbeat(
    createHeartbeatDto: CreateHeartbeatDto,
    id: string,
  ): Promise<Heartbeat> {
    return await this.prisma.heartbeat.create({
      data: { heartbeatId: id, ...createHeartbeatDto },
    });
  }

  async getHeartbeats(group: string): Promise<Heartbeat[]> {
    return await this.prisma.heartbeat.findMany({ where: { group: group } });
  }
}
