export interface BlockchainBlock {
    height: number;
    hash: string;
    time: number;
    main_chain: boolean;
}

export interface HashToBlock {
    [key: string]: BlockchainBlock;
}
