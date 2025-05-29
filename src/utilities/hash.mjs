import crypto from 'crypto';

export const createHash = (...args) => {
  const hash = crypto.createHash('sha256');
  hash.update(args.join(' '));
  return hash.digest('hex');
};