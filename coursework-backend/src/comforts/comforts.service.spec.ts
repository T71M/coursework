import { Test, TestingModule } from '@nestjs/testing';
import { ComfortsService } from './comforts.service';

describe('ComfortsService', () => {
  let service: ComfortsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComfortsService],
    }).compile();

    service = module.get<ComfortsService>(ComfortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
