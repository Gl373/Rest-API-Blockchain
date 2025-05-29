import { describe, it, expect, beforeEach } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';
import Transaction from '../models/Transaction.mjs';
import fs from 'fs/promises';
import path from 'path';

const blockchainFile = path.resolve('blockchain.test.json');

describe('Blockchain', () => {
  let blockchain, blockchain2, originalChain;

  beforeEach(async () => {
    await fs.writeFile(blockchainFile, JSON.stringify([Block.genesis()], null, 2));
    blockchain = new Blockchain('blockchain.test.json');
    blockchain2 = new Blockchain('blockchain.test.json');
    originalChain = blockchain.chain;
  });

  it('should contain an array of blocks', () => {
    expect(blockchain.chain).toBeInstanceOf(Array);
  });

  it('should start with the genesis block', () => {
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  describe('when adding a new block to the chain', () => {
    it('should add a block with transaction data', () => {
      const transaction = new Transaction({
        id: 'tx789',
        amount: 300,
        sender: 'Alice',
        receiver: 'Bob'
      });
      blockchain.addBlock({ data: transaction });
      expect(blockchain.chain.at(-1).data).toEqual(transaction);
    });

    it('should save the chain to blockchain.json', async () => {
      const transaction = new Transaction({
        id: 'tx789',
        amount: 300,
        sender: 'Alice',
        receiver: 'Bob'
      });
      await blockchain.addBlock({ data: transaction });
      const savedData = await fs.readFile(blockchainFile, 'utf8');
      const savedChain = JSON.parse(savedData);
      expect(savedChain.at(-1).data).toEqual(transaction);
    });
  });

  describe('when validating the chain with isValid', () => {
    describe('when the genesis block is missing or invalid', () => {
      it('should return false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' };
        expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
      });
    });

    describe('when the chain starts with the genesis block and consists of multiple blocks', () => {
      beforeEach(async() => {
        await blockchain.addBlock({ data: new Transaction({ id: 'tx1', amount: 100, sender: 'Alice', receiver: 'Bob' }) });
        await blockchain.addBlock({ data: new Transaction({ id: 'tx2', amount: 200, sender: 'Bob', receiver: 'Charlie' }) });
      });

      describe('and the lastHash reference has been tampered with', () => {
        it('should return false', () => {
          blockchain.chain[1].lastHash = 'broken-hash';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and a block contains invalid data', () => {
        it('should return false', () => {
          blockchain.chain[1].data = 'hacked-data';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain does not contain any invalid blocks', () => {
        it('should return true', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBeTruthy();
        });
      });
    });
  });

  describe('when replacing the chain with replaceChain', () => {
    describe('when the new chain is not longer', () => {
      it('should not replace the chain', () => {
        blockchain2.chain[0] = { data: 'new-data' };
        blockchain.replaceChain(blockchain2.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        blockchain2.addBlock({ data: new Transaction({ id: 'tx3', amount: 300, sender: 'Charlie', receiver: 'Alice' }) });
        blockchain2.addBlock({ data: new Transaction({ id: 'tx4', amount: 400, sender: 'Alice', receiver: 'Bob' }) });
      });

      describe('but is invalid', () => {
        it('should not replace the chain', () => {
          blockchain2.chain[1].hash = 'invalid-hash';
          blockchain.replaceChain(blockchain2.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe('but is valid', () => {
        it('should replace the chain', () => {
          blockchain.replaceChain(blockchain2.chain);
          expect(blockchain.chain).toEqual(blockchain2.chain);
        });
      });
    });
  });
});