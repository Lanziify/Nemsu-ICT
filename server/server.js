const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())


app.use('/api/user', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
