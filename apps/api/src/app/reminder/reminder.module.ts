import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { FolderModule } from '../folder/folder.module';

@Module({
  imports: [PrismaModule, FolderModule],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
