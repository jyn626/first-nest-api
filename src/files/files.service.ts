import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { eq } from 'drizzle-orm';
import { files } from 'src/db/schema';

@Injectable()
export class FilesService {
  // private files = [
  //   { id: 1, name: "photo.jpg", path: "/images/photo.jpg" },
  //   { id: 2, name: "song.mp3", path: "/music/song.mp3" },
  //   { id: 3, name: "document.pdf", path: "/docs/document.pdf" },
  //   { id: 4, name: "fIeYumGSYp4MQlIlU.gif", path: "test-files/fIeYumGSYp4MQlIlU.gif" }
  // ]

  async findAll(limit?: number, offset?: number) {
    // with simple pagination
    // return (
    //   limit && limit > 0 &&
    //   offset && offset > 0) ?
    //   this.files.slice(offset, limit) : this.files;

    return await db.query.files.findMany({
      offset,
      limit
    })
  }

  async findOne(id: number) {
    // const matched = this.files.find((file) => file.id === id);

    // if (!matched) {
    //   throw new NotFoundException();
    //   // throw new HttpException('File not found.', HttpStatus.NOT_FOUND);
    // }

    // return matched;
    const matched = await db.query.files.findFirst({
      where: eq(files.id, id)
    });

    if (!matched) {
      throw new NotFoundException();
    }


    return matched;
  }

  async delete(id: number) {
    // this.findOne(id); // check if the file exists first
    // return this.files.filter((file) => file.id !== id);

    return await db.delete(files).where(eq(files.id, id));
  }
}
