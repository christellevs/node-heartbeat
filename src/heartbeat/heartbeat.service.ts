import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  getHeartbeats(group: string) {
    return this.prisma.heartbeat.findMany({ where: { group: group } });
  }
}
