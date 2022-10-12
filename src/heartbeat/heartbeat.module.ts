import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HeartbeatService } from './heartbeat.service';

@Module({
  imports: [PrismaModule],
  controllers: [HeartbeatController],
  providers: [HeartbeatService],
})
export class HeartbeatModule {}
