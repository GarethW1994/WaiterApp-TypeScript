"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var exphb = require("express-handlebars");
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        this.config();
        this.startServer(port);
    }
    Server.prototype.config = function () {
        //mongoose
        var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiter_app_ts";
        //connect to mongodb
        mongoose.connect(mongoURL);
        //Handlebars
        //init Handlebars
        this.app.engine('handlebars', exphb({ defaultLayout: 'main' }));
        this.app.set('view engine', 'handlebars');
        //init body parser  
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //express - flash messages and session
        this.app.use(cookieParser('keyboard cat'));
        this.app.use(session({ cookie: { maxAge: 60000 } }));
        this.app.use(flash());
        //Stacic Files
        this.app.use(express.static('public'));
    };
    Server.prototype.startServer = function (port) {
        this.app.listen(port, function () { return console.log("Server running at http://localhost:" + port); });
    };
    return Server;
}());
exports.default = Server;
