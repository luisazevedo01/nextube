"use strict";
exports.__esModule = true;
var pino_1 = require("pino");
var logger = (0, pino_1["default"])({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
});
exports["default"] = logger;
