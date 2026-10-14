const express = require('express');
require('dotenv').config();

const masterRoutes = require('./src/routes/MasterRoutes');
const app = express();
app.use(express.json());

app.use('/api/masters', masterRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Slotly running on port ${PORT}`);
});
