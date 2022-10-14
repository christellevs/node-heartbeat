import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHeartbeatDto } from './dto/create-hearbeat.dto';
import { HeartbeatService } from './heartbeat.service';
import { Heartbeat } from './entities/heartbeat.entity';
import { Group } from './entities/group.entity';

@ApiTags('Node Heartbeat')
@Controller()
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}

  @Get()
  @ApiOperation({ summary: 'get a summary of all groups' })
  @ApiOkResponse({
    description: 'summary of groups',
    type: Group,
  })
  public summary(): Promise<Group[]> {
    return this.heartbeatService.getSummary();
  }

  @Get(':group')
  @ApiOperation({ summary: 'get all instances in a particular group' })
  @ApiOkResponse({
    description: 'instances in groups',
    type: Heartbeat,
  })
  public findAllByGroup(@Param('group') group: string): Promise<Heartbeat[]> {
    return this.heartbeatService.findAllByGroup(group);
  }

  @Post(':group/:id')
  @ApiOperation({ summary: 'create a heartbeat instance' })
  @ApiCreatedResponse({
    description: 'the newly created heartbeat',
    type: Heartbeat,
  })
  public create(
    @Param('group') group: string,
    @Param('id') id: string,
    @Body() createHeartbeatDto: CreateHeartbeatDto,
  ): Promise<Heartbeat> {
    return this.heartbeatService.create(group, id, createHeartbeatDto);
  }

  @Delete(':group/:id')
  @ApiOperation({ summary: 'delete a heartbeat' })
  @ApiOkResponse({
    description: 'the deleted heartbeat with the specified group and id',
  })
  public delete(
    @Param('group') group: string,
    @Param('id') id: string,
  ): Promise<Heartbeat> {
    return this.heartbeatService.delete(group, id);
  }
}
