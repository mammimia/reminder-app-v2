import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';
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
  async get(@Param('id') id: string): Promise<Reminder | null> {
    const reminder = await this.reminderService.get(id);

    return reminder;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateReminderDto): Promise<Reminder> {
    const reminder = await this.reminderService.create(createDto);
    return reminder;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateReminderDto
  ): Promise<Reminder> {
    const reminder = await this.reminderService.update(id, updateDto);
    return reminder;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.reminderService.delete(id);
  }
}
