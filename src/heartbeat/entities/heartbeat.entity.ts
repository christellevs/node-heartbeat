import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Meta } from './meta.entity';

import { Type } from 'class-transformer';

export class Heartbeat {
  @ApiProperty({
    description: 'The provided Heartbeat ID',
    example: 'e335175a-eace-4a74-b99c-c6466b6afadd',
  })
  @IsString()
  id!: string;

  @ApiProperty({
    description: 'The name of the group the heartbeat is part of',
    example: 'particle-detector',
  })
  @IsString()
  group!: string;

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
    description: 'Meta information attached to request body',
    example: '{ "foo": 1 }',
  })
  @IsString()
  meta!: Meta;
}
