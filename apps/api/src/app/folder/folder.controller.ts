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
import { CreateFolderDto, UpdateFolderDto } from '@mammimia/types';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async getAll() {
    const folders = await this.folderService.getAll();
    return folders;
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    const folder = await this.folderService.get(id);

    return folder;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(CreateFolderDto)) createDto: CreateFolderDto
  ) {
    const folder = await this.folderService.create(createDto);
    return folder;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(CreateFolderDto)) updateDto: UpdateFolderDto
  ) {
    const folder = await this.folderService.update(id, updateDto);
    return folder;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.folderService.delete(id);
  }
}
