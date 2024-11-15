# Projeto ADAM (Adaptador De Acessibilidade Mundial)

## 📋 Sobre o Projeto
ADAM é um assistente pessoal baseado em IA, focado inicialmente em auxiliar tarefas de programação. O projeto visa evoluir para uma AGI (Artificial General Intelligence) com capacidade de aprendizado contínuo.

### Objetivos Principais
- Assistência em programação
- Automatização de tarefas
- Aprendizado contínuo
- Suporte ao desenvolvimento de software

## 🚀 Status do Projeto
**Versão Atual:** MVP 0.1.0
**Última Atualização:** 15/11/2024

### Funcionalidades Implementadas
- [x] Estrutura básica do frontend (Next.js)
- [x] Estrutura básica do backend (NestJS)
- [x] Integração com Ollama Mistral
- [x] Chat básico funcionando
- [x] Comunicação frontend-backend estabelecida
- [ ] Sistema de histórico
- [ ] Interface completa
- [ ] Documentação da API

## 🛠 Estrutura do Projeto

### adam-api (Backend - NestJS)
```plaintext
adam-api/
├── src/
│   ├── ai/
│   │   ├── ai.module.ts
│   │   └── ai.service.ts
│   ├── chat/
│   │   ├── chat.controller.ts
│   │   ├── chat.module.ts
│   │   └── chat.service.ts
│   └── app.module.ts
```

### adam-assistente (Frontend - Next.js)
```plaintext
adam-assistente/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Chat.tsx
│   │   └── Header.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   └── types/
```

## 🔧 Tecnologias Utilizadas

### Backend
- NestJS
- Axios
- Ollama Mistral (7B-instruct)

### Frontend
- Next.js 15.0.3
- React
- Tailwind CSS
- Axios

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18+)
- npm ou yarn
- Ollama instalado localmente

### Instalação do Ollama
1. Instale o Ollama seguindo as instruções em: https://ollama.ai
2. Baixe o modelo Mistral:
```bash
ollama pull mistral:7b-instruct
```

### Backend (porta 3000)
```bash
cd adam-api
npm install
npm run start:dev
```

### Frontend (porta 3001)
```bash
cd adam-assistente
npm install
npm run dev -- -p 3001
```

## 📝 Logs de Desenvolvimento

### 15/11/2024
- [x] Integração básica com Ollama Mistral
- [x] Implementação do chat básico
- [x] Configuração do CORS
- [x] Comunicação frontend-backend

### Próximos Passos
1. Melhorar interface do chat
2. Implementar sistema de histórico
3. Adicionar header com informações do modelo
4. Implementar tratamento de erros
5. Adicionar documentação Swagger

## 🧪 Testes
- [ ] Testes unitários backend
- [ ] Testes unitários frontend
- [ ] Testes de integração

## 📚 Documentação
- API: Em desenvolvimento
- Frontend: Em desenvolvimento

## 🤝 Contribuição
Projeto em desenvolvimento inicial. Contribuições serão abertas em breve.

## 📄 Licença
MIT

## 📞 Contato
[Suas informações de contato]

---

> Última atualização: 15/11/2024