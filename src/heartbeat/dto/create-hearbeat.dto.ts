import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Meta } from '../entities/meta.entity';

export class CreateHeartbeatDto {
  @ApiProperty({
    description: 'Meta information attached to request body',
    example: '{ "foo": 1 }',
  })
  @IsString()
  meta: Meta;
}
