import { CreateFolderDto, UpdateFolderDto } from '@mammimia/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Folder } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FolderWithCategory } from './folder.adapter';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<FolderWithCategory[]> {
    const folders = await this.prisma.folder.findMany({
      include: {
        category: true,
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
}
