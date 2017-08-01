// module dependencies
import * as debug from "debug";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";

import { RenderType } from "./routes/base";
import { BaseRoute } from "./routes/base";
import { ThirdPartyRoute } from "./routes/thirdparty";

/**
 * Creates and configures an ExpressJS web server.
 *
 * @class Index
 */
export default class Index {
    public express: express.Express;
    public app: express.Application;
    public router: express.Router;

    /**
     * Bootstrap the application.
     *
     * @class Index
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Index {
        return new Index();
    }

    constructor() {
        // create expressjs application
        this.express = express();
        this.app = this.express;
        this.router = express.Router();

        // configure application
        this.config();
    }

    public api(app: express.Express, router: express.Router) {
        new ThirdPartyRoute(app, router);
    }

    private config() {
        let app = this.app;

        app.use(express.static(path.join(__dirname, "../..", "/client")));
        app.use(favicon(path.join(__dirname, "../", "/client/favicon.ico")));

        // config middleware
        this.middleware();
        
        // catch 404 and forward to error handler
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error(`Not found: /${req.method.toString()} ${req.url}.`);
            res.status(404);
            res.send(err.message);
        });

        // error handling
        app.use(errorHandler());
    }

    private middleware() {
        let app = this.app;
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        // use override middlware
        app.use(cookieParser());
        app.use(methodOverride());

        // config headers
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    }

    private routes() {
        let app = this.app;
        let router = this.router;

        BaseRoute.create("/", router, RenderType.file, path.join(__dirname, "../client/index.html"));
        app.use(router);

        BaseRoute.create("/api", router, RenderType.data);
        app.use(router);

        BaseRoute.create("/api/settings", router, RenderType.data, {});
        app.use(router);
    }
}