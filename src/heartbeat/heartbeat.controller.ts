import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';

@Controller('heartbeat')
export class HeartbeatController {
  @Get()
  findAll(@Param('group') group: string) {
    return `This group ${group}`;
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
