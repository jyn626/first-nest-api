import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { statSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { Mime } from 'mime';

@Injectable()
export class FileMetadataService {
  // ! TODO: manually test later  
  read(path: string) {

    if (!path) {
      throw new HttpException('File path missing', HttpStatus.NOT_FOUND);
    }

    try {
      let metadata = {};
      const stats = statSync(path);
      const mime = new Mime();


      metadata['filename'] = basename(path);
      metadata['extension'] = extname(path);
      metadata['size'] = stats.size;
      metadata['creationTime'] = stats.birthtime;
      metadata['MIME'] = mime.getType(path);

      return metadata;
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        // file permission denied error
        if (error.code == 'EACCES') {
          throw new HttpException('File permission denied', HttpStatus.FORBIDDEN)
          // file not found error
        } else if (error.code == 'ENOENT') {
          throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }
      }

      // TODO: fix this red squiggly line later
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
