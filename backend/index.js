const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const commentsRoutes = require('./routes/commentsRoute');
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use("/postRoute", postRoutes);
app.use("/commentRoute", commentsRoutes);

const PORT = process.env.PORT || 8000;


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }); console.log('Database schema updated');
});