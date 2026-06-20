require('dotenv').config();
const express = require('express');
const cors = require('cors');
const env = require('./src/config/env');
const routes = require('./src/presentation/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Web Nokos backend jalan 🚀'));

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server jalan di http://localhost:${env.port}`);
});
