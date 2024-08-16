import { CreateFolderDto, FolderDto, UpdateFolderDto } from '@mammimia/types';
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
import { FolderAdapter } from './folder.adapter';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async getAll(): Promise<FolderDto[]> {
    const folders = await this.folderService.getAll();
    return FolderAdapter.toDtoArray(folders);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<FolderDto> {
    const folder = await this.folderService.get(id);

    return FolderAdapter.toDto(folder);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateFolderDto)) createDto: CreateFolderDto
  ): Promise<FolderDto> {
    const folder = await this.folderService.create(createDto);
    return FolderAdapter.toDto(folder);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(CreateFolderDto)) updateDto: UpdateFolderDto
  ): Promise<FolderDto> {
    const folder = await this.folderService.update(id, updateDto);
    return FolderAdapter.toDto(folder);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.folderService.delete(id);
  }
}
