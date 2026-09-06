import { Injectable } from '@nestjs/common';
import { statSync } from 'node:fs';
import { basename, extname } from 'node:path';

@Injectable()
export class FileMetadataService {

  read(path: string) {
    let metadata = {};
    const stats = statSync(path);

    metadata['filename'] = basename(path);
    metadata['extension'] = extname(path);
    metadata['size'] = stats.size;
    metadata['creationTime'] = stats.birthtime;
  }
}
