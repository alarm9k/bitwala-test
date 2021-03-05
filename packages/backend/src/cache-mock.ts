import {HashToBlock} from 'bitwala-challenge-common/dist';

export interface CacheState {
    blocks: HashToBlock;
    requestInProgress: boolean;
}

// In real life this would be a distributed cache solution like Redis.
// If the cache has expired and was cleared, a microservice instance would check
// if another instance is currently re-requesting an update from the remote 3rd
// party server.
class CacheMock {
    private requestInProgress = false;
    private blocks: HashToBlock = {};

    getBlocksFromCache(): Promise<CacheState> {
        return Promise.resolve({
            blocks: this.blocks,
            requestInProgress: this.requestInProgress
        });
    }

    putBlocksToCache(blocksToCache: HashToBlock): void {
        this.requestInProgress = false;
        this.blocks = blocksToCache;
    }

    setRequestInProgress(): Promise<void> {
        this.requestInProgress = true;
        return Promise.resolve();
    }

    clearRequestInProgress(): void {
        this.requestInProgress = false;
    }
}

export const cacheMock = new CacheMock();
