const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const commentsRoutes = require('./routes/commentsRoute');
const usersRoutes = require('./routes/usersRoute');
const likesRoutes = require("./routes/LikeRoute");
require('dotenv').config();

const db = require('./models');

app.use(cors());
app.use(express.json());
app.use("/postRoute", postRoutes);
app.use("/commentRoute", commentsRoutes);
app.use("/usersRoute", usersRoutes);
app.use("/LikeRoute", likesRoutes);


const PORT = process.env.PORT || 8000;


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }); console.log('Database schema updated');
});