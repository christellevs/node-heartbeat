import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Group {
  @ApiProperty({
    description: 'The group name',
    example: 'particle-detector',
  })
  @IsString()
  group: String;

  @ApiProperty({
    description: 'The current instances of the group',
    example: '2',
  })
  @IsString()
  instances: String;

  @ApiProperty({
    description: 'First registered heartbeat of all the instances in the group',
    readOnly: true,
  })
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Last registered heartbeat of all the instances in the group',
    readOnly: true,
  })
  @Type(() => Date)
  @IsDate()
  lastUpdatedAt: Date;
}
