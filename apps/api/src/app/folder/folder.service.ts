import {
  CreateFolderDto,
  FilterFolderDto,
  UpdateFolderDto,
} from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Folder } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FolderWithCategory } from './folder.adapter';
import { prismaUtils } from '../utils/prisma.utils';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  private readonly DEFAULT_FOLDER_NAME = 'General';
  private readonly DEFAULT_FOLDER_COLOR = '#e85c0d';

  async getAll(filterDto: FilterFolderDto): Promise<FolderWithCategory[]> {
    const { where, take, skip, orderBy } =
      prismaUtils.buildQueryOptionsWithPagination(filterDto, FilterFolderDto);

    const folders = await this.prisma.folder.findMany({
      where,
      take,
      skip,
      include: {
        category: true,
        _count: {
          select: {
            reminders: true,
          },
        },
      },
      orderBy: orderBy || {
        reminders: {
          _count: 'desc',
        },
      },
    });

    return folders;
  }

  async get(id: string): Promise<FolderWithCategory> {
    const folder = await this.prisma.folder.findUnique({
      where: { id: id },
      include: {
        category: true,
      },
    });

    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }

    return folder;
  }

  async create(data: CreateFolderDto): Promise<Folder> {
    const folder = await this.prisma.folder.create({
      data,
    });

    return folder;
  }

  async update(id: string, data: UpdateFolderDto): Promise<Folder> {
    await this.get(id);
    const folder = await this.prisma.folder.update({
      where: {
        id,
      },
      data,
    });

    return folder;
  }

  async delete(id: string) {
    await this.get(id);
    await this.prisma.folder.delete({
      where: {
        id,
      },
    });
  }

  async getDefaultFolderId(): Promise<string> {
    const folder =
      (await this.prisma.folder.findFirst({
        where: { name: this.DEFAULT_FOLDER_NAME },
      })) ??
      (await this.create({
        name: this.DEFAULT_FOLDER_NAME,
        color: this.DEFAULT_FOLDER_COLOR,
      }));

    return folder.id;
  }
}
