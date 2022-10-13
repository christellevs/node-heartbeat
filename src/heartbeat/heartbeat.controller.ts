import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';
import { Heartbeat } from './entities/heartbeat.entity';

@Controller()
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}

  @Get(':group')
  findAll(@Param('group') group: string) {
    return this.heartbeatService.findAllByGroup(group);
  }

  @Post()
  create(@Body() createHeartbeatDto: CreateHeartbeatDto): Promise<Heartbeat> {
    return this.heartbeatService.create(createHeartbeatDto);
  }
}
