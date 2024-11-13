const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const serviceAccount = require('./serviceAccountKey.json'); // Adicione sua chave JSON do Firebase aqui
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore();

// Rotas de exemplo
app.get('/api/items', async (req, res) => {
  const snapshot = await db.collection('items').get();
  const items = snapshot.docs.map(doc => doc.data());
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = req.body;
  await db.collection('items').add(newItem);
  res.json({ message: 'Item added' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
