import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto, UpdateTransactionDto } from '@mammimia/types';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService
  ) {}

  async getAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        payment: true,
      },
    });

    return transactions;
  }

  async get(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: id },
      include: {
        payment: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async create(data: CreateTransactionDto): Promise<Transaction> {
    if (data.paymentId) {
      await this.paymentService.get(data.paymentId); // Ensure payment exists
    }

    const transaction = await this.prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    await this.get(id);

    if (data.paymentId) {
      await this.paymentService.get(data.paymentId); // Ensure payment exists
    }

    const transaction = await this.prisma.transaction.update({
      where: { id: id },
      data,
    });

    return transaction;
  }

  async delete(id: string): Promise<void> {
    await this.get(id);

    await this.prisma.transaction.delete({
      where: { id: id },
    });
  }
}
