import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { HeartbeatService } from './heartbeat/heartbeat.service';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HeartbeatModule, PrismaModule],
  controllers: [AppController, HeartbeatController],
  providers: [AppService, HeartbeatService],
})
export class AppModule {}
