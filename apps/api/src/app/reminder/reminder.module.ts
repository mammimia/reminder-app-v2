import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
