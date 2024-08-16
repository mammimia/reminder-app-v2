import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
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
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.getAll();
    return CategoryAdapter.toDtoArray(categories);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<CategoryDto> {
    const category = await this.categoryService.get(id);
    return CategoryAdapter.toDto(category);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateCategoryDto)) createDto: CreateCategoryDto
  ): Promise<CategoryDto> {
    const category = await this.categoryService.create(createDto);
    return CategoryAdapter.toDto(category);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateCategoryDto)) updateDto: UpdateCategoryDto
  ): Promise<CategoryDto> {
    const reminder = await this.categoryService.update(id, updateDto);
    return CategoryAdapter.toDto(reminder);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.categoryService.delete(id);
  }
}
