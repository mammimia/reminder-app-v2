import { CreateTransactionDto, UpdateTransactionDto } from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private paymentTypeService: PaymentTypeService
  ) {}

  async getAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        paymentType: true,
      },
    });

    return transactions;
  }

  async get(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: id },
      include: {
        paymentType: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async create(data: CreateTransactionDto): Promise<Transaction> {
    if (data.paymentTypeId) {
      await this.paymentTypeService.get(data.paymentTypeId); // Ensure payment exists
    }

    const transaction = await this.prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    await this.get(id);

    if (data.paymentTypeId) {
      await this.paymentTypeService.get(data.paymentTypeId); // Ensure payment exists
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
