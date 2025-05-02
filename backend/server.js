require('./db');   
const express     = require('express');
const cors        = require('cors');
require('dotenv').config();

const authRoutes  = require('./routes/auth');
const chartRoutes = require('./routes/charts');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',   authRoutes);
app.use('/api/charts', chartRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅  API running on http://localhost:${PORT}`));

