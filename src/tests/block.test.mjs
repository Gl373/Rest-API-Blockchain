import { describe, it, expect } from 'vitest';
import Block from '../models/Block.mjs';
import { genesisBlock } from '../models/genesis.mjs';
import { createHash } from '../utilities/hash.mjs';
import Transaction from '../models/Transaction.mjs';

describe('Block', () => {
  const timestamp = Date.now();
  const lastHash = 'last-hash';
  const data = { transactionId: 'tx123', amount: 100 };
  const hash = createHash(timestamp, lastHash, JSON.stringify(data));
  const block = new Block({ timestamp, lastHash, data, hash });

  it('has a timestamp property', () => {
    expect(block).toHaveProperty('timestamp');
  });

  it('has a hash property', () => {
    expect(block).toHaveProperty('hash');
  });

  it('has a lastHash property', () => {
    expect(block).toHaveProperty('lastHash');
  });

  it('has a data property', () => {
    expect(block).toHaveProperty('data');
  });

  it('sets properties correctly', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  describe('genesis', () => {
    const genesis = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesis).toBeInstanceOf(Block);
    });

    it('returns the genesis data', () => {
      expect(genesis).toEqual(genesisBlock);
    });
  });

  describe('mineBlock', () => {
    const previousBlock = Block.genesis();
    const data = { transactionId: 'tx456', amount: 200 };
    const minedBlock = Block.mineBlock({ previousBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock).toBeInstanceOf(Block);
    });

    it('sets lastHash to the hash of the previous block', () => {
      expect(minedBlock.lastHash).toEqual(previousBlock.hash);
    });

    it('sets the data', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets a timestamp', () => {
      expect(minedBlock.timestamp).not.toBeUndefined();
    });

    it('creates a valid SHA-256 hash', () => {
      expect(minedBlock.hash).toEqual(
        createHash(minedBlock.timestamp, minedBlock.lastHash, JSON.stringify(minedBlock.data), minedBlock.nonce, minedBlock.difficulty)
      );
    });

    it('creates a hash with the correct difficulty', () => {
      expect(minedBlock.hash.startsWith('0'.repeat(minedBlock.difficulty))).toBe(true);
    });

    it('includes a nonce', () => {
      expect(minedBlock.nonce).not.toBeUndefined();
    });

    it('handles complex Transaction objects', () => {
      const transaction = new Transaction({
        id: 'tx999',
        amount: 500,
        sender: 'Alice',
        receiver: 'Bob'
      });
      const minedBlock = Block.mineBlock({ previousBlock: Block.genesis(), data: transaction });
      expect(minedBlock.data).toEqual(transaction);
    });
  });
});