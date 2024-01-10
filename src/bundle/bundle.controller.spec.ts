import { Test, TestingModule } from '@nestjs/testing';
import { BundleController } from './bundle.controller';

describe('BundleController', () => {
  let controller: BundleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BundleController],
    }).compile();

    controller = module.get<BundleController>(BundleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
