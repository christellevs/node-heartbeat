import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HeartbeatModule, PrismaModule],
  controllers: [AppController, HeartbeatController],
  providers: [AppService],
})
export class AppModule {}
