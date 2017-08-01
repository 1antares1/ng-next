import * as http from "http";
import * as debug from "debug";

import Index from "./index";

debug('ts-express:server');

const httpPort = normalizePort(process.env.PORT || 3000);
let app = Index.bootstrap().app;

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  let bind = (typeof httpPort === "string") ? "Pipe " + httpPort : "Port " + httpPort;

  switch(error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

app.set("port", httpPort);

const server = app.listen(app.get("port"), () => {
    debug("Express server listening on port ".concat(" ", server.address().port.toString()));
});
console.log(" NodeJS server started on port ".concat(app.get("port")));

server.on("error", onError);
server.on("listening", onListening);