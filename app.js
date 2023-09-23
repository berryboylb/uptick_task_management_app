//Node.js ==> Express Framework (SIMPLE SERVER)
const express = require("express");
const errorHandler = require("./src/middleware/error-handler");
const { PORT } = require("./src/config/constants");
const bodyParser = require("body-parser");
const bootstrap = require("./src/boostrap");
const connectDb = require("./database/database")
const path = require("path");

//routes
const tasks = require("./src/routes/task")
const app = express();
connectDb()

//Use a Custom Templating Engine
app.set("view engine", "pug");

app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

app.use("/api/tasks", tasks);

//Main Page (Home)
// app.get("/", (_, res) => {
//   return res.send("Hello There");
// });


app.use(errorHandler);

app.listen(PORT, err => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server is Listening on: http://localhost:${PORT}/`);
});
