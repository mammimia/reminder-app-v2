import { Injectable, NotFoundException } from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateReminderDto, UpdateReminderDto } from './reminder.dto';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Reminder[]> {
    const reminders = await this.prisma.reminder.findMany();
    return reminders;
  }

  async get(id: string): Promise<Reminder | null> {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id: id },
    });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }

    return reminder;
  }

  async create(data: CreateReminderDto): Promise<Reminder> {
    const reminder = await this.prisma.reminder.create({
      data,
    });

    return reminder;
  }

  async update(id: string, data: UpdateReminderDto): Promise<Reminder> {
    await this.get(id);
    const reminder = await this.prisma.reminder.update({
      where: {
        id,
      },
      data,
    });

    return reminder;
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.prisma.reminder.delete({
      where: {
        id,
      },
    });
  }
}
