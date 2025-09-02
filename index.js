const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./Routes/route');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log('Server is running..!'));