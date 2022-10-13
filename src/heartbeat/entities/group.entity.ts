import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Group {
  @IsString()
  group: String;

  @IsString()
  instances: String;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Type(() => Date)
  @IsDate()
  lastUpdatedAt: Date;
}
