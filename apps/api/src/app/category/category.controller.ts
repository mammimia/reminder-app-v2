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
import { Category } from '@prisma/client';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@mammimia/types';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<Category | null> {
    return this.categoryService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateCategoryDto)) createDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateCategoryDto)) updateDto: UpdateCategoryDto
  ): Promise<Category> {
    const reminder = await this.categoryService.update(id, updateDto);
    return reminder;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.categoryService.delete(id);
  }
}
