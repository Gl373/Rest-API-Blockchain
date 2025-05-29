import express from 'express';
import { listAllBlocks, addBlock, findBlock } from '../controllers/blockchainController.mjs';

const router = express.Router();

router.route('/')
  .get(listAllBlocks)
  .post(addBlock);

router.get('/:hash', findBlock);

export default router;