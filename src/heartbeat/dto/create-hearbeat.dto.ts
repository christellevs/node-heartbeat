import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHeartbeatDto {
  @ApiProperty({
    description: 'The provided Instance ID',
    example: 'e335175a-eace-4a74-b99c-c6466b6afadd',
  })
  @IsString()
  instanceId!: string;

  @ApiProperty({
    description: 'The name of the group the instance is part of',
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
