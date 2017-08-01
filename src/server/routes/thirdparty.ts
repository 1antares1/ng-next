 import {
    NextFunction,
    Request,
    Response,
    Router,
    Express
} from "express";

import * as _ from "lodash";
import { BaseRoute } from "./base";
import { RenderType } from "./base";

/**
 * / route
 *
 * @class ThirdParty
 */
export class ThirdPartyRoute extends BaseRoute {
    app: Express;
    router: Router;
    constructor(_app: Express, _router: Router) {
        super();
        this.app = _app;
        this.router = _router;
        this.init();
    }

    init(): void {
        // this.router.get("/api/consultants/:id", (req: Request, res: Response, next: NextFunction) => {
        //     if(ConsultantCollections) {
        //         new ConsultantCollections().getConsultants((success: boolean, result: any[]) => {
        //             if(success && result) res.send(result);
        //             else res.status(404).send({ "error": "A problem has occurred with the consultants.", "stack": (result as any).message || result});
        //         }, req.params.id);
        //     }
        // });
        // this.app.use(this.router);

        // this.router.post("/api/consultants/report", (req: Request, res: Response, next: NextFunction) => {
        //     if(ConsultantCollections) {
        //         if(req.params && typeof req.body === "object") {
        //             new ConsultantCollections().getConsultantsReport(req.body as IConsultantParams, (success: boolean, result: any[]) => {
        //                 if(success && result && typeof result !== "string") {
        //                     res.send(result)
        //                 }
        //                 else res.status(404).send({ "error": "A problem has occurred with the consultants report.", "stack": (result as any).message || (result as any).code || result});
        //             });
        //         }
        //         else {
        //             res.status(500).send("The supplied parameters aren't correct.");
        //         }
        //     }
        // });
        // this.app.use(this.router);
    }

    aribaRoutes(): void {

    }

    wellsfargoRoutes(): void {
        
    }
}

 
//  app.get('/wellsframe.html', function (req, res) {
//             res.sendfile('./wellsframe.html');
//         });

//         app.get('/api/v1/thirdparty/:id', function (req, res) {
//             var id = req.params.id;
//             getSession(req, id, function (success, code, result) {

//                 var event = {
//                     'relatedTo': RelatedTo.Ariba,
//                     'username': '',
//                     'buyerCookie': id,
//                     'type': 'HttpRequest',
//                     'status': (success) ? 'success' : 'false',
//                     'location': '',
//                     'message': '',
//                     'stacktrace': '',
//                     'payload': id,
//                     'response': result,
//                     'origin': 0
//                 }

//                 saveEventLog(req, JSON.stringify(event));
//                 res.status(code).send(result);
//             });
//         });

//         app.post('/api/v1/userariba', xmlparser({ trim: false, explicitArray: false }), function (req, res) {
//             var body = req.body;
//             xmllogin = body;
//             var password;
//             var header = body.cxml.header;
//             var buyerCookie = body.cxml.request.punchoutsetuprequest.buyercookie;
//             var organizationName = '';
//             var companyId = '';
//             var fromCredentialsList = header.from.credential;
//             var toCredentialsList = header.to.credential;
//             var extrinsic = body.cxml.request.punchoutsetuprequest.extrinsic;
//             var costCenter = '';
//             var userEmail = '';
//             var uniqueName = '';
//             var userAgent = '';
//             var nameField = '';
//             var shipTo = '';
//             var fromCredential = extractFromCredential(header);
//             var toCredential = extractToCredential(header);

//             companyId = fromCredential.identity;

//             if (companyId === 'AN01000224524-T' || companyId === 'AN01000002779-T' || companyId === 'AN01041752136-T') {
//                 companyId = 'AN01041752136-T';
//             }

//             if (companyId === 'AN01005416529' || companyId === 'AN01005416529-T') {
//                 companyId = 'AN01005416529-T';
//             }

//             var organizationC = OrganizationClass.Chase;
//             // change protocol to: https
//             var url = (req.get('host').indexOf("localhost") !== -1 ? "http://" : "https://").concat(req.get('host'), '/#/login/', buyerCookie);

//             switch (companyId) {
//                 case 'AN01041752136-T':
//                     organizationName = 'JPMorgan Chase';
//                     organizationC = OrganizationClass.Chase;
//                     break;
//                 case 'AN01005416529-T':
//                     organizationName = 'Comerica';
//                     organizationC = OrganizationClass.Comerica;
//                     break;
//                 default:
//                     organizationName = 'Ariba';
//             }

//             for (var i = 0; i < extrinsic.length; i++) {
//                 switch (extrinsic[i].$.name) {
//                     case "CostCenter":
//                         costCenter = extrinsic[i]._;
//                         break;
//                     case "UserEmail":
//                         userEmail = extrinsic[i]._;
//                         break;
//                     case "UniqueName":
//                         uniqueName = extrinsic[i]._;
//                         break;
//                 }
//             }

//             if (typeof body.cxml.request.punchoutsetuprequest.contact != "undefined") {
//                 if (typeof body.cxml.request.punchoutsetuprequest.contact.name != "undefined") {
//                     nameField = body.cxml.request.punchoutsetuprequest.contact.name._;
//                 }

//                 if (typeof body.cxml.request.punchoutsetuprequest.contact.email != "undefined") {
//                     userEmail = body.cxml.request.punchoutsetuprequest.contact.email;
//                 }
//             }

//             if (typeof body.cxml.request.punchoutsetuprequest.shipto != "undefined") {
//                 shipTo = body.cxml.request.punchoutsetuprequest.shipto;
//             }

//             var shipToData = extractShipToData(shipTo);
//             if (!nameField.length && shipToData.careOf.length) {
//                 nameField = shipToData.deliverto;
//             }
//             var fullName = extractName(nameField, organizationC, OrganizationClass);

//             var userAriba;
//             password = uniqueName + body.cxml.header.sender.credential.sharedsecret;
//             if (companyId === 'AN01041752136-T') {
//                 userAriba = {
//                     'me': {
//                         'buyerCookie': buyerCookie,
//                         'fromIdentity': fromCredential.identity,
//                         'toIdentity': toCredential.identity,
//                         'browserFormPost': body.cxml.request.punchoutsetuprequest.browserformpost.url,
//                         'organizationName': organizationName,
//                         'relatedTo': RelatedTo.Ariba,
//                         'organizationClass': organizationC
//                     },
//                     'searchNotary': {
//                         'employeeId': uniqueName,
//                         'externalEmployeeId': uniqueName,
//                         'companyId': companyId,
//                         'firstName': fullName.firstName,
//                         'middleName': fullName.middleName,
//                         'lastName': fullName.lastName,
//                         'suffix': fullName.suffix,
//                         'email': userEmail,
//                         'emailAddress': userEmail,
//                         'addresses': new Array()
//                     },
//                     'userRequest': {
//                         'employeeId': uniqueName, //--UniqueName
//                         'externalEmployeeId': uniqueName,
//                         'userName': userEmail,
//                         'companyId': companyId,
//                         'costCenter': costCenter,
//                         'userGuid': '',
//                         'personGuid': '',
//                         'password': password,
//                         'emailAddress': userEmail,
//                         'firstName': fullName.firstName,
//                         'middleName': fullName.middleName,
//                         'lastName': fullName.lastName,
//                         'suffix': fullName.suffix,
//                         'preferSmsFor2FactorAuth': false
//                     },
//                     'addressRequest': {
//                         'addressGuid': '',
//                         'countryGuid': '',
//                         'addressType': '',
//                         'careOf': shipToData.careOf,
//                         'addressLine1': shipToData.addressLine1,
//                         'addressLine2': '',
//                         'city': shipToData.city,
//                         'postalCode': shipToData.postalcode,
//                         'stateCode': shipToData.stateCode,
//                         'country': 'US'
//                     }
//                 }
//             } else {
//                 userAriba = {
//                     'me': {
//                         'buyerCookie': buyerCookie,
//                         'fromIdentity': fromCredential.identity,
//                         'toIdentity': toCredential.identity,
//                         'browserFormPost': body.cxml.request.punchoutsetuprequest.browserformpost.url,
//                         'organizationName': organizationName,
//                         'relatedTo': RelatedTo.Ariba,
//                         'organizationClass': organizationC
//                     },
//                     'searchNotary': {
//                         'employeeId': uniqueName,
//                         'externalEmployeeId': uniqueName,
//                         'companyId': companyId,
//                         'firstName': fullName.firstName,
//                         'middleName': fullName.middleName,
//                         'lastName': fullName.lastName,
//                         'suffix': fullName.suffix,
//                         'email': userEmail,
//                         'emailAddress': userEmail,
//                         'addresses': new Array()
//                     },
//                     'userRequest': {
//                         'employeeId': uniqueName,
//                         'externalEmployeeId': uniqueName,
//                         'userName': userEmail,
//                         'companyId': companyId,
//                         'costCenter': costCenter,
//                         'userGuid': '',
//                         'personGuid': '',
//                         'password': password,
//                         'emailAddress': userEmail,
//                         'firstName': fullName.firstName,
//                         'middleName': fullName.middleName,
//                         'lastName': fullName.lastName,
//                         'suffix': fullName.suffix,
//                         'preferSmsFor2FactorAuth': false
//                     },
//                     'addressRequest': {
//                         'addressGuid': '',
//                         'countryGuid': '',
//                         'addressType': '',
//                         'careOf': shipToData.careOf,
//                         'addressLine1': shipToData.addressLine1,
//                         'addressLine2': '',
//                         'city': shipToData.city,
//                         'postalCode': shipToData.postalCode,
//                         'stateCode': shipToData.stateCode,
//                         'country': 'US'
//                     }
//                 }
//             }

//             userAriba.searchNotary.addresses = new Array(userAriba.addressRequest);

//             var model = {
//                 'buyerCookie': buyerCookie,
//                 'payload': JSON.stringify(userAriba)
//             };

//             invokeLogin(req, buyerCookie, req.rawBody, function (success, code, result) {
//                 if (success) {
//                     invokeSession(req, JSON.stringify(model), function (success, code, result) {
//                         var response = builder.create('cXML', {
//                             version: '1.0',
//                             sysID: 'http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd'
//                         })
//                             .att('payloadID', body.cxml.$.payloadID)
//                             .att('timestamp', body.cxml.$.timestamp)
//                             .att('xml:lang', 'en-US')
//                             .ele('Response')
//                             .ele('Status')
//                             .att('code', code)
//                             .att('text', result)
//                             .up()
//                             .ele('PunchOutSetupResponse')
//                             .ele('StartPage')
//                             .ele('URL')
//                             .text(url)
//                             .end();

//                         var xmlResult = '<?xml version="1.0"?>';
//                         xmlResult += '<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.1.007/cXML.dtd">';

//                         xmlResult += '<cXML version="1.1.007" payloadID="'.concat(body.cxml.$.payloadID, '" timestamp="', body.cxml.$.timestamp, '" xml:lang="en-US">');
//                         xmlResult += '<Response><Status code="' + code + '" text="' + result + '"></Status><PunchOutSetupResponse><StartPage><URL>'.concat(url, '</URL></StartPage></PunchOutSetupResponse></Response></cXML>');

//                         var event = {
//                             'relatedTo': RelatedTo.Ariba,
//                             'username': userAriba.userRequest.userName,
//                             'buyerCookie': buyerCookie,
//                             'type': 'HttpRequest',
//                             'status': (success) ? 'success' : 'false',
//                             'location': 'userariba',
//                             'message': '',
//                             'stacktrace': '',
//                             'payload': model,
//                             'response': result,
//                             'origin': 0
//                         }

//                         saveEventLog(req, JSON.stringify(event));

//                         res.header('Content-Type', 'application/xml');
//                         res.status(200).send(xmlResult);

//                     });
//                 }
//                 else {
//                     console.log(success, ' ', code, ' ', result);
//                 }


//             });
//         });

//         app.post('/api/v1/userwellsfargo', function (req, res) {
//             var samlResponse = req.body.samlResponse;
//             var errorCode = 200;
//             var textError = '';
//             if (samlResponse !== null && samlResponse.length > 0) {
//                 var uid = uuid.v4();
//                 // change url to: https
//                 var url = (req.get('host').indexOf("localhost") !== -1 ? "http://" : "https://").concat(req.get('host'), '/#/login/', uid);

//                 var authenticationInformation = {
//                     'uid': uid,
//                     'me': {
//                         'organizationName': 'Wells Fargo',
//                         'relatedTo': RelatedTo.WellsFargo,
//                         'organizationClass': OrganizationClass.WellsFargo,
//                         'samlStream': samlResponse
//                     }
//                 }

//                 var model = {
//                     'uid': uid,
//                     'payload': JSON.stringify(authenticationInformation) //.replace(/'/g, ''')
//                 };

//                 invokeLoginWf(req, uid, samlResponse, function (success, code, result) {
//                     if (success) {
//                         invokeSessionWf(req, JSON.stringify(model), function (success, code, result) {
//                             errorCode = code;
//                             textError = result;

//                             var event = {
//                                 'relatedTo': RelatedTo.WellsFargo,
//                                 'username': '',
//                                 'buyerCookie': uid,
//                                 'type': 'HttpRequest',
//                                 'status': (success) ? 'success' : 'false',
//                                 'location': 'userwellsfargo',
//                                 'message': '',
//                                 'stacktrace': '',
//                                 'payload': model,
//                                 'response': result,
//                                 'origin': 0
//                             }

//                             saveEventLog(req, JSON.stringify(event));

//                             if (success) {
//                                 res.redirect(301, url);
//                             }
//                             else {
//                                 res.status(errorCode).send(textError);
//                             }
//                         });
//                     }
//                     else {
//                         res.status(errorCode).send(textError);
//                     }
//                 });

//             } else {
//                 errorCode = 400;
//                 textError = 'Document not Valid';

//                 var event = {
//                     'relatedTo': RelatedTo.Ariba,
//                     'username': '',
//                     'buyerCookie': '',
//                     'type': 'HttpRequest',
//                     'status': (success) ? 'success' : 'false',
//                     'location': 'userariba',
//                     'message': textError,
//                     'stacktrace': '',
//                     'payload': model,
//                     'response': result,
//                     'origin': 0
//                 }

//                 saveEventLog(req, JSON.stringify(event));

//                 res.status(errorCode).send(textError);
//             }
//         });

//         app.post('/api/v1/approve', xmlparser({
//             trim: false,
//             explicitArray: false
//         }), function (req, res) {
//             var content = req.rawBody;
//             var body = req.body;
//             var errorCode = 200;
//             var textError = 'OK';

//             aprove = content;

//             invokeApprove(req, content, function (success, code, result) {
//                 errorCode = code;
//                 textError = result;

//                 if (!success) {
//                     errorEmailDeliver(req, textError, function (success, code, result) {
//                         errorCode = code;
//                         textError = result;
//                     });
//                 }

//                 var response = builder.create('cXML', {
//                     version: '1.0', encoding: 'UTF-8'
//                 },
//                 {
//                     ext: 'SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"'
//                 })
//                 .att('payloadID', body.cxml.$.payloadID)
//                 .att('timestamp', body.cxml.$.timestamp)
//                 .att('xml:lang', 'en')
//                 .ele('Response')
//                 .ele('Status')
//                 .att('code', errorCode)
//                 .att('text', textError)
//                 .up()
//                 .end();

//                 res.header('Content-Type', 'application/xml');
//                 res.send(response);
//             });
//         });

//         app.post('/api/v1/order/{cartId}', xmlparser({
//             trim: false,
//             explicitArray: false
//         }), function (req, res) {
//             var content = req.rawBody;
//             var cartId = req.params.cartId;
//             var errorCode = 200;
//             var textError = 'OK';

//             aprove = content;

//             invokeOrder(req, cartId, content, function (success, code, result) {
//                 res.send();
//             });

//         });