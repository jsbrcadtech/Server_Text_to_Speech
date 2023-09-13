const express = require('express');
const app = express();
const port = process.env.PORT || 8082;

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
const { loadData } = require('./Services/VoiceService');

loadData(app);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
