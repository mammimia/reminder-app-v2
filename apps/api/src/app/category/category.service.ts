import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateCategoryDto, UpdateCategoryDto } from '@mammimia/types';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async get(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data,
    });

    return category;
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    await this.get(id);

    const category = await this.prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async delete(id: string): Promise<void> {
    await this.get(id);

    await this.prisma.category.delete({
      where: { id },
    });
  }
}
