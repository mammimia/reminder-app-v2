import { Module } from '@nestjs/common';
import { BalanceModule } from '../balance/balance.module';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [PrismaModule, PaymentTypeModule, BalanceModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
