import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto, UpdateFolderDto } from './folder.dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const folders = await this.prisma.folder.findMany();
    return folders;
  }

  async get(id: string) {
    const folder = await this.prisma.folder.findUnique({
      where: { id: id },
    });

    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }

    return folder;
  }

  async create(data: CreateFolderDto) {
    const folder = await this.prisma.folder.create({
      data,
    });

    return folder;
  }

  async update(id: string, data: UpdateFolderDto) {
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
