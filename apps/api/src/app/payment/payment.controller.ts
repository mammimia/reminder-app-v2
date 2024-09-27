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
import { PaymentService } from './payment.service';
import { PaymentAdapter } from './payment.adapter';
import { CreatePaymentDto, PaymentDto } from '@mammimia/types';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAll() {
    const payments = await this.paymentService.getAll();
    return PaymentAdapter.toDtoArray(payments);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<PaymentDto> {
    const payment = await this.paymentService.get(id);

    return PaymentAdapter.toDto(payment);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePaymentDto): Promise<PaymentDto> {
    const payment = await this.paymentService.create(createDto);
    return PaymentAdapter.toDto(payment);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: CreatePaymentDto
  ): Promise<PaymentDto> {
    const payment = await this.paymentService.update(id, updateDto);
    return PaymentAdapter.toDto(payment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.paymentService.delete(id);
  }
}
