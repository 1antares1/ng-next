"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var base_1 = require("./routes/base");
var base_2 = require("./routes/base");
var thirdparty_1 = require("./routes/thirdparty");
/**
 * Creates and configures an ExpressJS web server.
 *
 * @class Index
 */
var Index = (function () {
    function Index() {
        // create expressjs application
        this.express = express();
        this.app = this.express;
        this.router = express.Router();
        // configure application
        this.config();
    }
    /**
     * Bootstrap the application.
     *
     * @class Index
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Index.bootstrap = function () {
        return new Index();
    };
    Index.prototype.api = function (app, router) {
        new thirdparty_1.ThirdPartyRoute(app, router);
    };
    Index.prototype.config = function () {
        var app = this.app;
        app.use(express.static(path.join(__dirname, "../..", "/client")));
        app.use(favicon(path.join(__dirname, "../", "/client/favicon.ico")));
        // config middleware
        this.middleware();
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error("Not found: /" + req.method.toString() + " " + req.url + ".");
            res.status(404);
            res.send(err.message);
        });
        // error handling
        app.use(errorHandler());
    };
    Index.prototype.middleware = function () {
        var app = this.app;
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        // use override middlware
        app.use(cookieParser());
        app.use(methodOverride());
        // config headers
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
        // add routes
        this.routes();
        // configure api
        this.api(this.express, this.router);
    };
    Index.prototype.routes = function () {
        var app = this.app;
        var router = this.router;
        base_2.BaseRoute.create("/", router, base_1.RenderType.file, path.join(__dirname, "../client/index.html"));
        app.use(router);
        base_2.BaseRoute.create("/api", router, base_1.RenderType.data);
        app.use(router);
        base_2.BaseRoute.create("/api/settings", router, base_1.RenderType.data, {});
        app.use(router);
    };
    return Index;
}());
exports["default"] = Index;
