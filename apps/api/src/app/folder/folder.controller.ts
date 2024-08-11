import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { CreateFolderDto, UpdateFolderDto } from './folder.dto';
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
  async get(@Param('id') id: string) {
    const folder = await this.folderService.get(id);

    return folder;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateFolderDto))
  async create(@Body() createDto: CreateFolderDto) {
    const folder = await this.folderService.create(createDto);
    return folder;
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(UpdateFolderDto))
  async update(@Param('id') id: string, @Body() updateDto: UpdateFolderDto) {
    const folder = await this.folderService.update(id, updateDto);
    return folder;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.folderService.delete(id);
  }
}
