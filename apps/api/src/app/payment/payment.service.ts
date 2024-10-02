import { CreatePaymentDto, UpdatePaymentDto } from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private paymentTypeService: PaymentTypeService
  ) {}

  async getAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
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
    await this.get(id);

    await this.prisma.payment.delete({
      where: { id: id },
    });
  }
}
