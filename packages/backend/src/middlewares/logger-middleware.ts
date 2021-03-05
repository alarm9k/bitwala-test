import winston from 'winston';
import {RequestHandler} from 'express';

// In real-life scenario the transport would be a network connection to the centralized logging
// service. The logs would be aggregated and stored in a database.
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

export interface LoggerBaseMessage {
    serviceId: string;
    requestId: string;
    timestamp: number;
}

export function loggerBaseMessage(requestId: string, serviceId: string): LoggerBaseMessage {
    return {requestId, serviceId, timestamp: Date.now()};
}

function logRequest(requestId: string, serviceId: string, url: string): void {
    logger.info('INCOMING REQUEST', {...loggerBaseMessage(requestId, serviceId), url});
}

export function logIncomingRequests(serviceId: string): RequestHandler {
    return (req, res, next) => {
        logRequest(req.id, serviceId, req.url);
        next();
    }
}
