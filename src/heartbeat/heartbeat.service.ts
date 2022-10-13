import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Heartbeat } from './entities/heartbeat.entity';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  // async create(
  //   createHeartbeatDto: CreateHeartbeatDto,
  //   group: string,
  //   id: string,
  // ): Promise<Heartbeat> {
  //   return await this.prisma.heartbeat.create({
  //     data: { heartbeatId: id, group: group, ...createHeartbeatDto },
  //   });
  // }

  // async getAllByGroup(group: string): Promise<Heartbeat[]> {
  //   return await this.prisma.heartbeat.findMany({ where: { group: group } });
  // }

  // async delete(id: string): Promise<Heartbeat> {
  //   try {
  //     return await this.prisma.heartbeat.delete({ where: { heartbeatId: id } });
  //   } catch (err) {
  //     if (err instanceof PrismaClientKnownRequestError) {
  //       if (err.code === 'P2025') {
  //         throw new NotFoundException(`heartbeat with ID ${id} not found`);
  //       }
  //     }
  //     throw err;
  //   }
  // }
}
