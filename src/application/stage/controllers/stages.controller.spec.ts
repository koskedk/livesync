import { Test, TestingModule } from '@nestjs/testing';
import { StagesController } from './stages.controller';

describe('Stage Controller', () => {
  let controller: StagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StagesController],
    }).compile();

    controller = module.get<StagesController>(StagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
