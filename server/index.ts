import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/clients', (req, res) => {
  fs.readFile(path.join(__dirname, 'clients.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const clients = JSON.parse(data);
    res.json(clients);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
