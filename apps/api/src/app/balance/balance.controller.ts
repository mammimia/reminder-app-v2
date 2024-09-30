import {
  BalanceDto,
  ChangeBalanceDto,
  CreateBalanceDto,
} from '@mammimia/types';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BalanceAdapter } from './balance.adapter';
import { BalanceService } from './balance.service';

@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getAll(): Promise<BalanceDto[]> {
    const balances = await this.balanceService.getAll();
    return BalanceAdapter.toDtoArray(balances);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<BalanceDto> {
    const balance = await this.balanceService.get(id);
    return BalanceAdapter.toDto(balance);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateBalanceDto): Promise<BalanceDto> {
    const balance = await this.balanceService.create(createDto);
    return BalanceAdapter.toDto(balance);
  }

  @Patch(':id/increase')
  @HttpCode(HttpStatus.OK)
  async increaseBalance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeBalanceDto: ChangeBalanceDto
  ): Promise<BalanceDto> {
    const balance = await this.balanceService.increaseBalance(
      id,
      changeBalanceDto.amount
    );
    return BalanceAdapter.toDto(balance);
  }

  @Patch(':id/reduce')
  @HttpCode(HttpStatus.OK)
  async reduceBalance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeBalanceDto: ChangeBalanceDto
  ): Promise<BalanceDto> {
    console.log(changeBalanceDto);
    const balance = await this.balanceService.reduceBalance(
      id,
      changeBalanceDto.amount
    );

    return BalanceAdapter.toDto(balance);
  }
}
