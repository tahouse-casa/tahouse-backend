const cors = require("cors");
const express = require("express");
const routerApi = require("./routes");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = [
  "http://localhost:3000",
  "https://dev.tahouse.casa",
  "https://www.thunderclient.com",
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

require("./tools");

app.get("/", (req, res) => {
  res.send("Hola este es mi server en express");
});
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port" + port);
});
