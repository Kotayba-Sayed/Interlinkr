const express = require('express');
const app = express();
const cors = require('cors');
const Routes = require('./routes/route');
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use("/route", Routes);

const PORT = process.env.PORT || 3000;


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }); console.log('Database schema updated');
});