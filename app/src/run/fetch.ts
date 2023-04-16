import * as dotenv from 'dotenv';
import { Connection, PublicKey } from '@solana/web3.js';

import { loadWallet } from 'utils';
import { deserializeUnchecked } from 'borsh';
import { AccountData, movieReviewAccountSchema } from 'deserialize';

dotenv.config();

const main = async () => {
  const connection = new Connection(process.env.OFFICIAL_SOL_DEV_HTTPS!);
  const programId = new PublicKey(process.env.ANCHOR_PROGRAM_ID!);
  const wallet = loadWallet();

  const movieReview = {
    title: 'test10',
    description: 'testtesttesttest',
    rating: 6,
  };
  const [movieReviewPda] = PublicKey.findProgramAddressSync(
    [Buffer.from(movieReview.title), wallet.publicKey.toBuffer()],
    programId
  );

  // deserialize
  const reviewAccount = await connection.getAccountInfo(movieReviewPda);
  const accountData = deserializeUnchecked(
    movieReviewAccountSchema,
    AccountData,
    reviewAccount!.data
  );
  console.log(accountData);

  // testing
  // convert uint8 array into sha256 hash that anchor uses for account ids
  const { name } = accountData as any;
  const hash = Array.from(name, (byte: any) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
  console.log(hash);
};

main();
