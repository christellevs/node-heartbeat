import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  getHeartbeats() {
    return this.prisma.heartbeat.findMany();
  }
}
