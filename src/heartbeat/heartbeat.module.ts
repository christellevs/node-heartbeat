import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatSchema } from '../schemas/heartbeat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Heartbeat', schema: HeartbeatSchema }]),
  ],
  controllers: [HeartbeatController],
  providers: [HeartbeatService],
})
export class HeartbeatModule {}
