import { Injectable } from '@nestjs/common';
import crypto from 'crypto'
import fs from 'fs'
import { pipeline } from 'stream';


@Injectable()
export class HashService {

  getSHA256(filepath: string) {
    return new Promise((resolve, reject) => {
      console.log(filepath)
      // create readable filestream
      const fileStream = fs.createReadStream(filepath); // readable source
      // create sha-256 hash stream
      const hashStream = crypto.createHash('sha256'); // writable/transform
      // create writable output stream
      const outputStream = fs.createWriteStream('output.txt'); // readable source

      fileStream.on('data', (chunk) => {
        hashStream.update(chunk);
      })

      fileStream.on('end', () => {
        resolve(hashStream.digest('hex'))
      })

      fileStream.on('error', (error) => {
        reject(error)
      })

    })
  }

}
