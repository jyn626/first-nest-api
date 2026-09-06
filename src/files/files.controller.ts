import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import type { FileCreateDto } from './dtos/file-create.dto';
import { FilesService } from './files.service';
import { FileMetadataService } from 'src/file-metadata/file-metadata.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(
    private fileService: FilesService,
    private fileMetadataService: FileMetadataService,
  ) { }

  @Get('/test')
  test() {
    return 'hello'
  }

  // GET /files
  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number) {

    return await this.fileService.findAll(limit, offset);
  }

  // GET /files/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.fileService.findOne(id);
  }

  // GET /files/:extension
  @Get(':extension')
  findByExtension(@Param("extension") extension: string) {
  }


  // POST /files
  @UseInterceptors(
    FileInterceptor('file', { // FileInterceptor('file') handles the multipart field
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

          cb(null, filename);
        }
      })
    })
  )
  @Post()
  upload(@UploadedFile('file') file: Express.Multer.File) { // and @UploadedFile() retrieves the resulting file object
    console.log(file)
    return this.fileService.upload(file.originalname, file.path);
  }

  // DELETE /files/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.delete(id);
  }

  // POST /files/:id/analyze
  @Get(':id/analyze')
  async analyze(@Param('id', ParseIntPipe) id: number) {
    const file = await this.findOne(id);

    return this.fileMetadataService.read(file.path);
  }
}
