import * as dotenv from 'dotenv';
import { Connection, PublicKey } from '@solana/web3.js';
import { addMovieReview } from 'serialize/actions';

import { loadWallet } from 'utils';

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
  const movieReviewAccount = await addMovieReview(
    connection,
    wallet,
    programId,
    movieReview
  );
};

main();
