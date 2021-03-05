import axios from 'axios';
import {BlockchainBlock} from 'bitwala-challenge-common';
import {logger, loggerBaseMessage} from './middlewares/logger-middleware';
import {servicedId} from './index';

const http = axios.create();

function logOutgoingRequest(initialRequestId: string, remoteUrl = ''): void {
    logger.info('OUTGOING REQUEST', {...loggerBaseMessage(initialRequestId, servicedId), url: remoteUrl});
}

http.interceptors.request.use(req => {
    logOutgoingRequest(req.id, req.url);
    return req;
});

export interface RemoteResponse {
    blocks: BlockchainBlock[];
}

export const thirdPartyApi = {
    getBlocks: (requestId: string) => http.request<RemoteResponse>({
        url: 'https://blockchain.info/blocks?format=json',
        method: 'GET',
        id: requestId
    })
};
