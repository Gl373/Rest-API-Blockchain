import { MINE_RATE, INITIAL_DIFFICULTY } from '../utilities/constants.mjs';
import { createHash } from '../utilities/hash.mjs';
import { genesisBlock } from './genesis.mjs';

export default class Block {
  constructor({ timestamp, lastHash, data, hash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty || INITIAL_DIFFICULTY;
  }

  static genesis() {
    return new Block(genesisBlock);
  }

static mineBlock({ previousBlock, data }) {
  let timestamp, hash, nonce = 0;
  const lastHash = previousBlock.hash;
  let { difficulty } = previousBlock;

  do {
    nonce++;
    timestamp = Date.now();
    console.log('MINEBLOCK createHash args:', timestamp, lastHash, JSON.stringify(data), nonce, difficulty);
    hash = createHash(timestamp, lastHash, JSON.stringify(data), nonce, difficulty);
    console.log('MINEBLOCK createHash result:', hash);
    difficulty = Block.adjustDifficultyLevel({ block: previousBlock, timestamp });
  } while (!hash.startsWith('0'.repeat(difficulty)));

  return new Block({ timestamp, lastHash, data, hash, nonce, difficulty });
}

  static adjustDifficultyLevel({ block, timestamp }) {
    const { difficulty } = block;

    if (difficulty < 1) return 1;

    if (timestamp - block.timestamp > MINE_RATE) {
      return difficulty - 1;
    }

    return difficulty + 1;
  }
}