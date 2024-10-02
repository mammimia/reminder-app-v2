import { CreatePaymentTypeDto, PaymentTypeDto } from '@mammimia/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentTypeAdapter } from './payment-type.adapter';
import { PaymentTypeService } from './payment-type.service';

@Controller('payment-types')
export class PaymentTypeController {
  constructor(private readonly paymentService: PaymentTypeService) {}

  @Get()
  async getAll() {
    const payments = await this.paymentService.getAll();
    return PaymentTypeAdapter.toDtoArray(payments);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<PaymentTypeDto> {
    const payment = await this.paymentService.get(id);

    return PaymentTypeAdapter.toDto(payment);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreatePaymentTypeDto
  ): Promise<PaymentTypeDto> {
    const payment = await this.paymentService.create(createDto);
    return PaymentTypeAdapter.toDto(payment);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: CreatePaymentTypeDto
  ): Promise<PaymentTypeDto> {
    const payment = await this.paymentService.update(id, updateDto);
    return PaymentTypeAdapter.toDto(payment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.paymentService.delete(id);
  }
}
