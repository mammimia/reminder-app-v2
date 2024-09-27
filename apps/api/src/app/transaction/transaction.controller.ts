import {
  CreateTransactionDto,
  TransactionDto,
  UpdateTransactionDto,
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
import { TransactionAdapter } from './transaction.adapter';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAll(): Promise<TransactionDto[]> {
    const transactions = await this.transactionService.getAll();
    return TransactionAdapter.toDtoArray(transactions);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<TransactionDto> {
    const transaction = await this.transactionService.get(id);
    return TransactionAdapter.toDto(transaction);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateTransactionDto
  ): Promise<TransactionDto> {
    const transaction = await this.transactionService.create(createDto);
    return TransactionAdapter.toDto(transaction);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTransactionDto
  ): Promise<TransactionDto> {
    const transaction = await this.transactionService.update(id, updateDto);
    return TransactionAdapter.toDto(transaction);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.transactionService.delete(id);
  }
}
