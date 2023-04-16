import crypto from 'crypto';

export const getFirst8BytesOfSha256 = (instructionName: string): Buffer => {
  const hash = crypto.createHash('sha256');
  hash.update(instructionName);
  const fullHash = hash.digest();
  return fullHash.slice(0, 8);
};
