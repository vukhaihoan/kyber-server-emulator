require("dotenv").config();
const express = require("express");
const fs = require("fs");

var cors = require("cors");
const app = express();
const httpServer = require("http").createServer(app);
var port = process.env.PORT || 8000;
const options = {
  cors: {
    origin: "*",
  },
};

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("connect mongodb success");
}
// main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

var api = require("./routers");
app.use("/", api);

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});
