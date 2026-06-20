import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Create Express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client (server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Health probe
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Action Planner using Gemini 3.5 Flash
app.post('/api/plan-action', async (req, res) => {
  const { cause, location, language = 'PT' } = req.body;
  if (!cause) {
    return res.status(400).json({ error: 'Causa é obrigatória' });
  }

  try {
    const ai = getAiClient();
    
    // Construct a specific, detailed system prompt for the action planner
    const systemInstruction = `Você é o assistente inteligente oficial da instituição de caridade global "Faça Você Também".
Sua tarefa é gerar um plano de ação prático baseado no altruísmo local ("Planejador de Ação Solidária").
Gere ideias autônomas de caridade e impacto social para colocar em prática no bairro, escola, igreja ou empresa do usuário. 
Você deve responder em formato markdown limpo, de forma estruturada e motivadora, idealmente traduzido para o idioma solicitado (PT, EN ou ES).
O plano gerado NÃO deve conter jargões excessivos e DEVE conter:
1. 💡 Nome Inspirador: Um título simbólico e cativante para a ação local.
2. 📋 Cronograma de Execução: Um cronograma sequencial de 4 fases práticas e exequíveis (ex: Planejamento, Divulgação, Arrecadação, Entrega/Ação).
3. 📦 Materiais Mínimos Necessários: Uma lista concisa de itens e recursos essenciais para viabilizar tudo.
4. 📣 Estratégia de Mobilização Global na Base do Amor: Como atrair voluntários locais, divulgar no grupo de WhatsApp, mídias sociais e cooperar.
Gere textos fluidos e bem estruturados, com formatação que fique excelente na tela. Adicione alguns emojis condizentes.`;

    const locationNotice = location ? `O local planejado para mobilização é: ${location}.` : 'O local é genérico/comunidade local.';
    const promptText = `Crie um planejamento de impacto social completo para a causa: "${cause}".\n${locationNotice}\nIdioma solicitado para a resposta: ${language}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const resultText = response.text || 'Não foi possível gerar o planejamento solidário. Tente novamente.';
    res.json({ plan: resultText });
  } catch (error: any) {
    console.error('Erro na chamada do Gemini API:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao processar a inteligência do plano' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static files serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Faça Você Também] Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();
