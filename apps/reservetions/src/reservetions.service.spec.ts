import { Test, TestingModule } from '@nestjs/testing';
import { ReservetionsService } from './reservetions.service';

describe('ReservetionsService', () => {
  let service: ReservetionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservetionsService],
    }).compile();

    service = module.get<ReservetionsService>(ReservetionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
