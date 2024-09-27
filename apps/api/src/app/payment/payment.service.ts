import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from '@prisma/client';
import { CreatePaymentDto, UpdatePaymentDto } from '@mammimia/types';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Payment[]> {
    return await this.prisma.payment.findMany();
  }

  async get(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async create(data: CreatePaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data,
    });
  }

  async update(id: string, data: UpdatePaymentDto): Promise<Payment> {
    await this.get(id);
    return await this.prisma.payment.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.prisma.payment.delete({
      where: { id: id },
    });
  }
}
