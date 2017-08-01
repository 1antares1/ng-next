"use strict";
exports.__esModule = true;
var debug = require("debug");
var index_1 = require("./index");
debug('ts-express:server');
var httpPort = normalizePort(process.env.PORT || 3000);
var app = index_1["default"].bootstrap().app;
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === "string") ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    var bind = (typeof httpPort === "string") ? "Pipe " + httpPort : "Port " + httpPort;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
app.set("port", httpPort);
var server = app.listen(app.get("port"), function () {
    debug("Express server listening on port ".concat(" ", server.address().port.toString()));
});
console.log(" NodeJS server started on port ".concat(app.get("port")));
server.on("error", onError);
server.on("listening", onListening);
