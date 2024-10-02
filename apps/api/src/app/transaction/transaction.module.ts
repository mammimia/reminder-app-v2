import { Module } from '@nestjs/common';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule, PaymentTypeModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
