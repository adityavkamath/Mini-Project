const connectToMongo = require("./database/db");
const express = require("express");
const app = express();
const path = require("path")
connectToMongo();
const port = 5000 || process.env.PORT;
const cors = require("cors");


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello I am Working Fine")
})

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
