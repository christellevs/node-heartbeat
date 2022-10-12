import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Heartbeat } from './entities/heartbeat.entity';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  async getHeartbeats(group: string): Promise<Heartbeat[]> {
    return await this.prisma.heartbeat.findMany({ where: { group: group } });
  }
}
