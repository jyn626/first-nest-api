import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { FilesModule } from './files/files.module';
import { FileMetadataService } from './file-metadata/file-metadata.service';

@Module({
  imports: [ProfilesModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, FileMetadataService],
})
export class AppModule {}
