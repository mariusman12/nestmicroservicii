import { Test, TestingModule } from '@nestjs/testing';
import { ReservetionsController } from './reservetions.controller';
import { ReservetionsService } from './reservetions.service';

describe('ReservetionsController', () => {
  let controller: ReservetionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservetionsController],
      providers: [ReservetionsService],
    }).compile();

    controller = module.get<ReservetionsController>(ReservetionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
