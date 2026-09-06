import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileMetadataService } from 'src/file-metadata/file-metadata.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FileMetadataService]
})
export class FilesModule { }
