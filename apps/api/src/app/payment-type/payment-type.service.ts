import { CreatePaymentTypeDto, UpdatePaymentTypeDto } from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentTypeService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<PaymentType[]> {
    return await this.prisma.paymentType.findMany();
  }

  async get(id: string): Promise<PaymentType> {
    const paymentType = await this.prisma.paymentType.findUnique({
      where: { id: id },
    });

    if (!paymentType) {
      throw new NotFoundException(`Payment Type with ID ${id} not found`);
    }

    return paymentType;
  }

  async create(data: CreatePaymentTypeDto): Promise<PaymentType> {
    return await this.prisma.paymentType.create({
      data,
    });
  }

  async update(id: string, data: UpdatePaymentTypeDto): Promise<PaymentType> {
    await this.get(id);
    return await this.prisma.paymentType.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.prisma.paymentType.delete({
      where: { id: id },
    });
  }
}
