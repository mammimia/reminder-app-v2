import {
  CreatePaymentDto,
  PaymentDto,
  UpdatePaymentDto,
} from '@mammimia/types';
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
import { PaymentAdapter } from './payment.adapter';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAll(): Promise<PaymentDto[]> {
    const payments = await this.paymentService.getAll();
    return PaymentAdapter.toDtoArray(payments);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<PaymentDto> {
    const payments = await this.paymentService.get(id);
    return PaymentAdapter.toDto(payments);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePaymentDto): Promise<PaymentDto> {
    const payments = await this.paymentService.create(createDto);
    return PaymentAdapter.toDto(payments);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdatePaymentDto
  ): Promise<PaymentDto> {
    const payments = await this.paymentService.update(id, updateDto);
    return PaymentAdapter.toDto(payments);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.paymentService.delete(id);
  }

  @Post(':id/pay')
  async pay(@Param('id', ParseUUIDPipe) id: string): Promise<PaymentDto> {
    const payments = await this.paymentService.pay(id);
    return PaymentAdapter.toDto(payments);
  }
}
