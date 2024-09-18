import {
  CreateReminderDto,
  ReminderDto,
  UpdateReminderDto,
  ReminderFilterDto,
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
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { ReminderAdapter } from './reminder.adapter';
import { ReminderService } from './reminder.service';

@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async getAll(@Query() filterDto: ReminderFilterDto): Promise<ReminderDto[]> {
    const reminders = await this.reminderService.getAll(filterDto);
    return ReminderAdapter.toDtoArray(reminders);
  }

  @Get('/today')
  async getToday(
    @Query() filterDto: ReminderFilterDto
  ): Promise<ReminderDto[]> {
    const reminders = await this.reminderService.getToday(filterDto);
    return ReminderAdapter.toDtoArray(reminders);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<ReminderDto> {
    const reminder = await this.reminderService.get(id);

    return ReminderAdapter.toDto(reminder);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateReminderDto)) createDto: CreateReminderDto
  ): Promise<ReminderDto> {
    const reminder = await this.reminderService.create(createDto);
    return ReminderAdapter.toDto(reminder);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateReminderDto
  ): Promise<ReminderDto> {
    const reminder = await this.reminderService.update(id, updateDto);
    return ReminderAdapter.toDto(reminder);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.reminderService.delete(id);
  }
}
