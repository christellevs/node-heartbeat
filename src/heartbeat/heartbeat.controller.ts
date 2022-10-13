import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';
import { Heartbeat } from './entities/heartbeat.entity';
import { Group } from './entities/group.entity';

@Controller()
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}

  @Get()
  public summary() {
    return this.heartbeatService.getSummary();
  }

  @Get(':group')
  public findAllByGroup(@Param('group') group: string): Promise<Heartbeat[]> {
    return this.heartbeatService.findAllByGroup(group);
  }

  @Post(':group/:id')
  public create(
    @Param('group') group: string,
    @Param('id') id: string,
    @Body() createHeartbeatDto: CreateHeartbeatDto,
  ): Promise<Heartbeat> {
    return this.heartbeatService.create(group, id, createHeartbeatDto);
  }

  @Delete(':group/:id')
  public delete(
    @Param('group') group: string,
    @Param('id') id: string,
  ): Promise<Heartbeat> {
    return this.heartbeatService.delete(group, id);
  }
}
