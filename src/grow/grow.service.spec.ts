import { Test, TestingModule } from '@nestjs/testing';
import { GrowService } from './grow.service';

describe('GrowService', () => {
  let service: GrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrowService],
    }).compile();

    service = module.get<GrowService>(GrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
