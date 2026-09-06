import { Controller, Post, Get, Delete, Body, Query, Param, HttpCode, HttpStatus } from '@nestjs/common';
import type { FileCreateDto } from './dtos/file-create.dto';
import { FilesService } from './files.service';
import { FileMetadataService } from 'src/file-metadata/file-metadata.service';


@Controller('files')
export class FilesController {
  constructor(
    private fileService: FilesService,
    private fileMetadataService: FileMetadataService,
  ) { }

  // GET /files
  @Get()
  findAll(
    @Query("limit") limit: number,
    @Query("offset") offset: number) {
    return this.fileService.findAll(limit, offset);
  }

  // GET /files/:id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(id);
  }

  // POST /files
  @Post()
  create(@Body() fileCreateDto: FileCreateDto) {
  }

  // DELETE /files/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id) {
    return this.fileService.delete(id);
  }

  // POST /files/:id/analyze
  @Get(':id/analyze')
  async analyze(@Param('id') id: number) {
    const file = await this.findOne(id);

    return this.fileMetadataService.read(file.path);
  }
}
