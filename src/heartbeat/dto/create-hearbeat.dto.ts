import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHeartbeatDto {
  @ApiProperty({
    description: 'The provided heartbeat ID',
    example: 'e335175a-eace-4a74-b99c-c6466b6afadd',
  })
  @IsString()
  heartbeatId!: string;

  @ApiProperty({
    description: 'The name of the group the heartbeat is part of',
    example: 'particle-detector',
  })
  @IsString()
  group!: string;

  @ApiProperty({
    description: 'Meta information attached to request body',
    example: '{ "foo": 1 }',
  })
  @IsString()
  meta!: string;
}
