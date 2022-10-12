import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';
import { Heartbeat } from './entities/heartbeat.entity';

@Controller(':group')
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}
  @Get()
  findAll(@Param('group') group: string) {
    return this.heartbeatService.getHeartbeats(group);
  }

  @Post(':id')
  async createHeartbeat(
    @Param('id') id: string,
    @Body() createHeartbeatDto: CreateHeartbeatDto,
  ): Promise<Heartbeat> {
    return await this.heartbeatService.createHeartbeat(createHeartbeatDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Deleted: ${id}`;
  }
}
