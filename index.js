const cors = require("cors");
const Multer = require("multer");
const express = require("express");
const routerApi = require("./routes");
const rateLimit = require("express-rate-limit");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3001;

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
app.use(multer.array("file"));
app.use(express.json());
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
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

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
});

app.use(limiter);

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
