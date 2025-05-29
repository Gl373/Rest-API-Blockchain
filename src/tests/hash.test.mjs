import { createHash } from '../utilities/hash.mjs';

describe('createHash function', () => {
  it('should generate a SHA-256 hash as output', () => {
    expect(createHash('test')).toEqual(
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    );
  });

  it('should generate different output with the same input in different order', () => {
    expect(createHash('olle', 'emelie', 'yanet')).not.toEqual(
      createHash('emelie', 'olle', 'yanet')
    );
  });
});