import { Module } from '@nestjs/common';
import { PaymentModule } from '../payment/payment.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule, PaymentModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
