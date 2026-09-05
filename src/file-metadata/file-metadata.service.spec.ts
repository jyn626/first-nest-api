import { Test, TestingModule } from '@nestjs/testing';
import { FileMetadataService } from './file-metadata.service';

describe('FileMetadataService', () => {
  let service: FileMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileMetadataService],
    }).compile();

    service = module.get<FileMetadataService>(FileMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
