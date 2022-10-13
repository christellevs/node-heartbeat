import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';
import { Heartbeat } from './entities/heartbeat.entity';

@Controller()
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}
  @Get()
  findAll(@Param('group') group: string) {
    return this.heartbeatService.getAllByGroup(group);
  }

  @Post(':group/:id')
  async createHeartbeat(
    @Param('group') group: string,
    @Param('id')
    id: string,
    @Body() createHeartbeatDto: CreateHeartbeatDto,
  ): Promise<Heartbeat> {
    return await this.heartbeatService.create(createHeartbeatDto, group, id);
  }

  @Delete(':group/:id')
  async delete(
    @Param('group') group: string,
    @Param('id') id: string,
  ): Promise<Heartbeat> {
    return this.heartbeatService.delete(id);
  }
}
