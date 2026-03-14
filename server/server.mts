import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HashbrownOpenAI } from '@hashbrownai/openai';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post('/chat', async (req, res) => {
  const stream = HashbrownOpenAI.stream({
    apiKey: process.env.API_KEY,
    request: req.body
  })

  res.header('Content-Type', 'application/octet-stream');

  for await (const chunk of stream) {
    res.write(chunk);
  }

  res.end();
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
