import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReminderModule } from './reminder/reminder.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [ReminderModule, FolderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
