import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Balance, Currency } from '@prisma/client';
import { CreateBalanceDto } from '@mammimia/types';

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Balance[]> {
    const balances = await this.prisma.balance.findMany();

    return balances;
  }

  async get(id: string): Promise<Balance> {
    const balance = await this.prisma.balance.findUnique({
      where: { id: id },
    });

    if (!balance) {
      throw new NotFoundException(`Balance with ID ${id} not found`);
    }

    return balance;
  }

  async getBalanceWithCurrency(currency: Currency): Promise<Balance | null> {
    const balance = await this.prisma.balance.findFirst({
      where: { currency: currency },
    });

    return balance;
  }

  async create(data: CreateBalanceDto): Promise<Balance> {
    const existingBalance = await this.getBalanceWithCurrency(data.currency);
    console.log(existingBalance);

    if (existingBalance !== null) {
      throw new ConflictException(
        `Balance with currency ${data.currency} already exists`
      );
    }

    const balance = await this.prisma.balance.create({
      data,
    });

    return balance;
  }

  async increaseBalance(id: string, amount: number): Promise<Balance> {
    const balance = await this.prisma.balance.update({
      where: { id: id },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    return balance;
  }

  async reduceBalance(id: string, amount: number): Promise<Balance> {
    const balance = await this.get(id);

    if (balance.amount < amount) {
      throw new ConflictException(
        `Balance with currency ${balance.currency} does not have enough amount`
      );
    }

    await this.prisma.balance.update({
      where: { id: id },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    return balance;
  }
}
