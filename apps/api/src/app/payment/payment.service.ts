import {
  CreatePaymentDto,
  PaymentFilterDto,
  UpdatePaymentDto,
} from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment, PaymentMethod, TransactionType } from '@prisma/client';
import { BalanceService } from '../balance/balance.service';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaUtils } from '../utils/prisma.utils';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private paymentTypeService: PaymentTypeService,
    private balanceService: BalanceService
  ) {}

  async getAll(filterDto: PaymentFilterDto): Promise<Payment[]> {
    const { where, take, skip, orderBy } =
      prismaUtils.buildQueryOptionsWithPagination(filterDto, PaymentFilterDto);

    const payments = await this.prisma.payment.findMany({
      where,
      take,
      skip,
      orderBy: orderBy ? orderBy : { paymentDate: 'desc' },
      include: {
        type: true,
      },
    });

    return payments;
  }

  async get(id: string): Promise<Payment> {
    const payments = await this.prisma.payment.findUnique({
      where: { id: id },
      include: {
        type: true,
      },
    });

    if (!payments) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payments;
  }

  async create(data: CreatePaymentDto): Promise<Payment> {
    if (data.typeId) {
      await this.paymentTypeService.get(data.typeId); // Ensure payment exists
    }

    const payment = await this.prisma.payment.create({
      data,
    });

    return payment;
  }

  async update(id: string, data: UpdatePaymentDto): Promise<Payment> {
    await this.get(id);

    if (data.typeId) {
      await this.paymentTypeService.get(data.typeId); // Ensure payment exists
    }

    const payment = await this.prisma.payment.update({
      where: { id: id },
      data,
    });

    return payment;
  }

  async delete(id: string): Promise<void> {
    const payment = await this.get(id);

    if (payment.paidDate != null && payment.method == PaymentMethod.CASH) {
      if (payment.transactionType == TransactionType.EXPENSE) {
        await this.balanceService.increaseBalanceWithCurrency(
          payment.currency,
          payment.amount
        );
      } else {
        await this.balanceService.reduceBalanceWithCurrency(
          payment.currency,
          payment.amount
        );
      }
    }

    await this.prisma.payment.delete({
      where: { id: id },
    });
  }

  async pay(id: string): Promise<Payment> {
    const payment = await this.get(id);

    if (payment.paidDate) {
      throw new Error('Payment is already paid');
    }

    const paidDate = new Date().toISOString();

    await this.balanceService.reduceBalanceWithCurrency(
      payment.currency,
      payment.amount
    );

    const updatedPayment = await this.prisma.payment.update({
      where: { id: id },
      data: {
        paidDate,
      },
    });

    return updatedPayment;
  }
}
