
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import http from "http";
import https from "https";
import mongoose from "mongoose";
import path from "path";
import tls from "tls";
import { config } from "./5HeadConfigs/config";

// Check Env
const isDev = fs.existsSync(__dirname + "/isDev");

// Server Port
const port = isDev ? 8120 : 8200;

// Connect MongoDB
// mongoose.connect(isDev ? config.mongodb_dev : config.mongodb_prod, { useNewUrlParser: true }, (err) => {
//     if (err) {
//         console.log("MongoDB connection ERROR: ", err);
//         startServer(8100);
//     } else {
//         console.log("MongoDB connection SUCCESS");
//         // startServer(port);
//         // temp dev http server for CHN domains
//         startServer(8100);
//     }
// });

// Express App
const app = express();

// CORS
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body Parser
app.use(bodyParser.text());
app.use(bodyParser.json());


// enable rate limiter
const apiLimiter = new rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
});
app.use("/api/", apiLimiter);

// Define Express routes
// app.use("/", express.static(path.join(__dirname, "../../dist/ts-app")));
// app.use("/home", express.static(path.join(__dirname, "../../dist/ts-app")));
// app.use("/project", express.static(path.join(__dirname, "../../dist/ts-app")));
// app.use("/blog", express.static(path.join(__dirname, "../../dist/ts-app")));
// app.use("/about", express.static(path.join(__dirname, "../../dist/ts-app")));

console.log(path.join(__dirname, "../../dist/app"))

// define route for the default home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/app") + "/index.html");
});


// start the Express server
const startServer = function (port: number) {

    http.createServer({}, app).listen(port, () => {
        console.log(isDev ? "DEV SERVER" : "PROD SERVER", " started at http://localhost:" + port);
    });
};
