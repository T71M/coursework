import { Test, TestingModule } from '@nestjs/testing';
import { ComfortsController } from './comforts.controller';
import { ComfortsService } from './comforts.service';

describe('ComfortsController', () => {
  let controller: ComfortsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComfortsController],
      providers: [ComfortsService],
    }).compile();

    controller = module.get<ComfortsController>(ComfortsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
