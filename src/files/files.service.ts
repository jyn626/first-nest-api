import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FilesService {
  private files = [
    { id: 1, name: "photo.jpg", path: "/images/photo.jpg" },
    { id: 2, name: "song.mp3", path: "/music/song.mp3" },
    { id: 3, name: "document.pdf", path: "/docs/document.pdf" }
  ]

  findAll(limit?: number, offset?: number) {
    // with simple pagination
    return (
      limit && limit > 0 &&
      offset && offset > 0) ?
      this.files.slice(offset, limit) : this.files;
  }

  findOne(id: number) {
    const matched = this.files.find((file) => file.id === id);

    if (!matched) {
      throw new NotFoundException();
      // throw new HttpException('File not found.', HttpStatus.NOT_FOUND);
    }

    return matched;
  }

  delete(id: number) {
    this.findOne(id); // check if the file exists first
    return this.files.filter((file) => file.id !== id);
  }

}
