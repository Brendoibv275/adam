import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiService],
    }).compile();

    service = module.get<AiService>();
  });

  it('should generate response for programming question', async () => {
    const response = await service.generateResponse(
      'Como usar async/await em JavaScript?'
    );
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
  });

  it('should analyze code', async () => {
    const code = `
      function soma(a, b) {
        return a + b;
      }
    `;
    const analysis = await service.analyzeCode(code);
    expect(analysis).toBeTruthy();
    expect(typeof analysis).toBe('string');
  });
}); 