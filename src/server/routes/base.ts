import {
    NextFunction,
    Request,
    Response,
    Router
} from "express";

export enum RenderType {
    data,
    file
}
const url = require("url");

export class BaseRoute {
    constructor() { }

    private static appSettings(req: Request, res: Response): Object {
        let _fullUrl = (hostname: string): string => {
            let _protocol = ((req.connection as any).encrypted) ? "https:" : (req.headers["x-forwarded-proto"] as string || req.protocol);
            _protocol = _protocol.split(/\s*,\s*/)[0];

            return url.format({
                protocol: _protocol,
                host: hostname
            });
        }

        let obj: Object = {
            appConfig: {},
            urls: {
                consultant: process.env.consultant_Url ? process.env.consultant_Url : _fullUrl(req.get("host"))
            }
        };
        return obj;
    }

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(path: string, router: Router, type: RenderType, options ? : Object | string) {
        let _target: string = (path === "/") ? " index " : " ";
        console.log(`[IndexRoute::create] Creating${_target}route: '${path}')`);

        router.get(path, (req: Request, res: Response, next: NextFunction) => {
            switch (path) {
                case "/api/settings":
                    options = BaseRoute.appSettings(req, res);
                    break;
            }
            new BaseRoute().index(req, res, type, options);
        });
    }

    
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
    public render(req: Request, res: Response, type: RenderType, options? : Object | string) {
        // add constants
        res.locals.BASE_URL = "/";

        // send data
        switch (type) {
            case RenderType.data: res.send(options);
                break;

            case RenderType.file: res.sendFile(options.toString());
                break;
        }
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, type: RenderType, options: Object | string) {
        this.render(req, res, type, options);
    }
}