import {RequestHandler} from 'express';
import { v4 as uuid } from 'uuid';

// Each request is assigned a unique id for debugging purposes. The id is written to the logs,
// passed back to the client as a response header, and included as a request header if we need
// to contact another microservice.
export const addRequestId: RequestHandler = (req, res, next) => {
    req.id = uuid();
    res.set({'X-Request-ID': req.id});
    next();
}
