import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsUrl } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';

import { Type } from 'class-transformer';

@Schema
export class Heartbeat {
  @ApiProperty({
    description: 'The automatically generated ID of the heartbeat in the db',
    readOnly: true,
  })
  @IsInt()
  readonly id!: number;

  @ApiProperty({
    description: 'The provided Heartbeat ID',
    example: 'e335175a-eace-4a74-b99c-c6466b6afadd',
  })
  @IsUrl()
  heartbeatId!: string;

  @ApiProperty({
    description: 'First registered heartbeat',
    readOnly: true,
  })
  @Type(() => Date)
  @IsDate()
  readonly createdAt!: Date;

  @ApiProperty({
    description: 'Last registered heartbeat',
    readOnly: true,
  })
  @Type(() => Date)
  @IsDate()
  readonly updatedAt!: Date;

  @ApiProperty({
    description: 'The name of the group the heartbeat is part of',
    example: 'particle-detector',
  })
  @IsUrl()
  group!: string;

  @ApiProperty({
    description: 'Meta information attached to request body',
    example: '{ "foo": 1 }',
  })
  @IsUrl()
  meta!: string;
}
