import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HashbrownOpenAI } from '@hashbrownai/openai';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env['PORT'] || 3000;

app.post('/chat', async (req, res) => {
  const apiKey = process.env['OPEN_AI_KEY'];
  if (!apiKey) return res.status(400).send('Invalid API Key');

  const stream = HashbrownOpenAI.stream.text({
    apiKey,
    request: req.body,
  });

  res.header('Content-Type', 'application/octet-stream');

  for await (const chunk of stream) {
    res.write(chunk);
  }

  return res.end();

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
