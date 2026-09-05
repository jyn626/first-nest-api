import { Injectable } from '@nestjs/common';
import { statSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { Mime } from 'mime';


@Injectable()
export class FileMetadataService {

  // ! TODO: manually test later  
  read(path: string) {
    let metadata = {};
    const stats = statSync(path);
    const mime = new Mime();


    metadata['filename'] = basename(path);
    metadata['extension'] = extname(path);
    metadata['size'] = stats.size;
    metadata['creationTime'] = stats.birthtime;
    metadata['MIME'] = mime.getType(path);
  }
}
