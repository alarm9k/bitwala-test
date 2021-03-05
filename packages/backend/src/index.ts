import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {logIncomingRequests} from './middlewares/logger-middleware';
import {api} from './api';
import {addRequestId} from './middlewares/request-id-middleware';
import {checkIfAuthenticated} from './middlewares/authenticated-middleware';

// In case of distributed architecture the service ID would be used to identify the source of
// the logged event in the aggregated log database.
export const servicedId = 'server'

const app = express();

app.use([
    cors(),
    helmet(),
    addRequestId,
    logIncomingRequests(servicedId),
    checkIfAuthenticated
]);

app.use(api);

app.listen(3001);
