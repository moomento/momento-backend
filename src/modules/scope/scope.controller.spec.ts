import { Test, TestingModule } from '@nestjs/testing';
import { ScopeController } from './scope.controller';
import { ScopeService } from './scope.service';

describe('ScopeController', () => {
  let controller: ScopeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScopeController],
      providers: [ScopeService],
    }).compile();

    controller = module.get<ScopeController>(ScopeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
