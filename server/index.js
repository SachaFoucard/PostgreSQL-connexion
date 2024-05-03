const express = require('express');
const client = require('./config/db');

require('dotenv').config()

const app = express();
const PORT = 3000

app.use(express.json());

app.use('/api/',require('./routes/routes.users'))

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))

client.connect();
