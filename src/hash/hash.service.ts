import { Injectable } from '@nestjs/common';
import crypto from 'crypto'
import fs from 'fs'
import { pipeline } from 'stream';


@Injectable()
export class HashService {

  async getSHA256(filepath: string) {
    // create readable filestream
    const fileStream = fs.createReadStream(filepath); // readable source
    // create sha-256 hash stream
    const hashStream = crypto.createHash('sha256'); // writable/transform

    try {
      // pipeline 
      // - filestream reads the file by chunk,
      // - and each chunk will be then send to the hash stream
      // - where the hashing is handled.

      // if the disk reads the file faster than the crypto algorithm
      // can calculate the hash, the pipeline automatically tells the file stream to pause.
      // once the crypto stream catches up, the pipeline tells the file stream to resume.
      await pipeline(fileStream, hashStream); // the computed binary hash sits in the stream's internal buffer

      const finalhash = hashStream.read().toString('hex');

      return finalhash;
    } catch (error) {
      console.log(error)
    }
  }

}
