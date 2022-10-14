import { ApiProperty } from '@nestjs/swagger';
import { Meta } from '../entities/meta.entity';

export class CreateHeartbeatDto {
  @ApiProperty({
    description: 'Meta information attached to request body',
    example: { foo: '2' },
  })
  meta: Meta;
}
