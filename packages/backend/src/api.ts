import {Router} from 'express';
import {cacheMock} from './cache-mock';
import {Response} from 'express';
import {logger, loggerBaseMessage} from './middlewares/logger-middleware';
import {servicedId} from './index';
import {thirdPartyApi} from './third-party-api';
import {HashToBlock} from 'bitwala-challenge-common';

export const api = Router();

function logCacheHit(requestId: string): void {
    logger.info('SERVED FROM CACHE', loggerBaseMessage(requestId, servicedId));
}

async function getBlocks(requestId: string): Promise<HashToBlock> {
    const {blocks, requestInProgress} = await cacheMock.getBlocksFromCache();

    if (blocks && Object.keys(blocks).length > 0) {
        logCacheHit(requestId);
        return blocks;
    } else if (requestInProgress) {
        // In real life this would subscribe to cache change event and serve from cache when
        // notified about an update.
        // Real-life scenario would also account for edge cases when another instance initiated
        // the request, set the "requestInProgress" flag, and then died. We would do something
        // after a timeout.
        return {};
    } else {
        // Wait until the flag is set in the cache layer to avoid multiple instances competing
        // against each other to fetch the data.
        await cacheMock.setRequestInProgress();
        try {
            // In real life there will also be runtime json schema validation.
            // It would do something when a malformed response is received from the 3rd party API.
            const remoteResponse = await thirdPartyApi.getBlocks(requestId);
            const blocks = remoteResponse.data.blocks.reduce((acc, next) => {
                acc[next.hash] = next;
                return acc;
            }, {} as HashToBlock);
            cacheMock.putBlocksToCache(blocks);
            return blocks;
        } catch (e) {
            cacheMock.clearRequestInProgress();
            return {};
        }
    }
}

api.get('/', async (req, res: Response<HashToBlock>) => {
    const blocks = await getBlocks(req.id);
    res.send(blocks);
});

api.get('/:blockId', async (req, res) => {
    const blocks = await getBlocks(req.id);
    const blockId = req.params.blockId;

    if(blockId in blocks) {
        res.send(blocks[blockId]);
    } else {
        res.sendStatus(404);
    }
})
