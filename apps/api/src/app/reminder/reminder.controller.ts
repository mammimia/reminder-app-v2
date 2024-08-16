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
import { Reminder } from '@prisma/client';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { CreateReminderDto, UpdateReminderDto } from '@mammimia/types';
import { ReminderService } from './reminder.service';

@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async getAll(): Promise<Reminder[]> {
    const reminders = await this.reminderService.getAll();
    return reminders;
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<Reminder | null> {
    const reminder = await this.reminderService.get(id);

    return reminder;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateReminderDto)) createDto: CreateReminderDto
  ): Promise<Reminder> {
    const reminder = await this.reminderService.create(createDto);
    return reminder;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateReminderDto
  ): Promise<Reminder> {
    const reminder = await this.reminderService.update(id, updateDto);
    return reminder;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.reminderService.delete(id);
  }
}
