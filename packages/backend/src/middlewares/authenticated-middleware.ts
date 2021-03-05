import {RequestHandler} from 'express';

// In real life this function would extract the JWT from the header and check
// its validity.
function isAuthenticatedMock(authHeader = ''): boolean {
    return true;
}

// We assume that the API we are building is going to be a private API. For
// this reason there will be some kind of authentication.
export const checkIfAuthenticated: RequestHandler = (req, res, next) => {
    if(isAuthenticatedMock(req.headers.authorization)) {
        next();
    } else {
        res.sendStatus(403);
    }
}
