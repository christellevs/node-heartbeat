import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Meta {
  @ApiProperty({
    description: 'Meta information',
    example: '1',
  })
  @IsString()
  foo: string;
}
