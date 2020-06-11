import { Test, TestingModule } from '@nestjs/testing';
import { CommonLoggerService } from './common.logger.service';

describe('LoggerService', () => {
  let provider: CommonLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonLoggerService],
    }).compile();

    provider = module.get<CommonLoggerService>(CommonLoggerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
