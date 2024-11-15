import { Injectable, Logger } from '@nestjs/common';
import { Ollama } from '@langchain/ollama';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class AiService {
  private model: Ollama;
  private outputParser: StringOutputParser;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    this.model = new Ollama({
      baseUrl: 'http://localhost:11434',
      model: 'mistral:7b-instruct',
      temperature: 0.7,
    });
    this.outputParser = new StringOutputParser();
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const systemPrompt = `Você é o Adam, um assistente especializado em programação.
        Você deve responder em Português do Brasil.
        
        Seu perfil:
        - Especialista em desenvolvimento de software
        - Focado em ajudar programadores
        - Fornece exemplos práticos de código
        - Explica conceitos técnicos de forma clara
        
        Regras de resposta:
        1. SEMPRE formate o código usando blocos markdown com a linguagem especificada
        2. Inclua comentários explicativos no código
        3. Forneça exemplos de uso práticos
        4. Explique o raciocínio por trás da solução
        5. Sugira possíveis melhorias ou alternativas
        6. Se aplicável, mencione considerações de performance

        Formato da resposta:
        1. Explicação inicial do conceito
        2. Código com comentários
        3. Exemplo de uso
        4. Explicações adicionais
        5. Possíveis variações ou melhorias`;

      const prompt = `${systemPrompt}\n\nUsuário: ${message}\n\nAdam:`;

      this.logger.debug(`Processando mensagem: ${message}`);
      
      const response = await this.model
        .invoke(prompt)
        .then(this.outputParser.invoke.bind(this.outputParser));

      return response;
    } catch (error) {
      this.logger.error(`Erro: ${error.message}`);
      return 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?';
    }
  }
}
