"use strict";
exports.__esModule = true;
var RenderType;
(function (RenderType) {
    RenderType[RenderType["data"] = 0] = "data";
    RenderType[RenderType["file"] = 1] = "file";
})(RenderType = exports.RenderType || (exports.RenderType = {}));
var url = require("url");
var BaseRoute = (function () {
    function BaseRoute() {
    }
    BaseRoute.appSettings = function (req, res) {
        var _fullUrl = function (hostname) {
            var _protocol = (req.connection.encrypted) ? "https:" : (req.headers["x-forwarded-proto"] || req.protocol);
            _protocol = _protocol.split(/\s*,\s*/)[0];
            return url.format({
                protocol: _protocol,
                host: hostname
            });
        };
        var obj = {
            appConfig: {},
            urls: {
                consultant: process.env.consultant_Url ? process.env.consultant_Url : _fullUrl(req.get("host"))
            }
        };
        return obj;
    };
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    BaseRoute.create = function (path, router, type, options) {
        var _target = (path === "/") ? " index " : " ";
        console.log("[IndexRoute::create] Creating" + _target + "route: '" + path + "')");
        router.get(path, function (req, res, next) {
            switch (path) {
                case "/api/settings":
                    options = BaseRoute.appSettings(req, res);
                    break;
            }
            new BaseRoute().index(req, res, type, options);
        });
    };
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The type to response.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    BaseRoute.prototype.render = function (req, res, type, options) {
        // add constants
        res.locals.BASE_URL = "/";
        // send data
        switch (type) {
            case RenderType.data:
                res.send(options);
                break;
            case RenderType.file:
                res.sendFile(options.toString());
                break;
        }
    };
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    BaseRoute.prototype.index = function (req, res, type, options) {
        this.render(req, res, type, options);
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
