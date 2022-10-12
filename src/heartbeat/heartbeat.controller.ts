import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';

@Controller()
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}
  @Get(':group')
  findAll(@Param('group') group: string) {
    return this.heartbeatService.getHeartbeats();
  }

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() heartbeatDto: CreateHeartbeatDto,
  ): string {
    return `Group ID: ${id} - Group: ${heartbeatDto.group} - Meta: ${heartbeatDto.meta}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Deleted: ${id}`;
  }
}
