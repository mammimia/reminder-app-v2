import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { FolderModule } from './folder/folder.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { ReminderModule } from './reminder/reminder.module';
import { TransactionModule } from './transaction/transaction.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    ReminderModule,
    FolderModule,
    CategoryModule,
    PaymentTypeModule,
    TransactionModule,
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
