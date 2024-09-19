import {
  CreateReminderDto,
  ReminderFilterDto,
  UpdateReminderDto,
} from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Reminder, ReminderStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { prismaUtils } from '../utils/prisma.utils';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  async getAll(filterDto: ReminderFilterDto): Promise<Reminder[]> {
    const { where, take, skip, orderBy } =
      prismaUtils.buildQueryOptionsWithPagination(filterDto, ReminderFilterDto);

    const reminders = await this.prisma.reminder.findMany({
      where,
      take,
      skip,
      orderBy,
      include: {
        folder: true,
      },
    });

    return this.sortRemindersByStatus(reminders);
  }

  private sortRemindersByStatus(reminders: Reminder[]): Reminder[] {
    const statusOrder: Record<ReminderStatus, number> = {
      TODO: 1,
      IN_PROGRESS: 2,
      PENDING: 3,
      DONE: 4,
      CANCELED: 5,
    };

    return reminders.sort(
      (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );
  }

  async get(id: string): Promise<Reminder> {
    const reminder = await this.prisma.reminder.findUnique({
      where: { id: id },
      include: {
        folder: true,
      },
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
