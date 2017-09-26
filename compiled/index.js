"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import server
var server_1 = require("./server");
//import routes
var routes_1 = require("./src/routes/routes");
//define port
var port = 3000;
//start server
var server = new server_1.default(port);
server.app.get("/", routes_1.default.index);
server.app.get("/login", routes_1.default.login);
server.app.get("/waiters/:username", routes_1.default.selectDays);
server.app.get("/getDays", routes_1.default.getDays);
server.app.post("/getUser", routes_1.default.getUserName);
server.app.post("/waiters/:username", routes_1.default.postDays);
