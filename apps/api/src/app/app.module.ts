import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [ReminderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
