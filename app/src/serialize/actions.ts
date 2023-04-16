/* eslint-disable @typescript-eslint/naming-convention */

import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

import { getFirst8BytesOfSha256 } from 'utils';

interface MovieReview {
  title: string;
  description: string;
  rating: number;
}

export const addMovieReview = async (
  connection: Connection,
  wallet: Keypair,
  programId: PublicKey,
  movieReview: MovieReview
) => {
  const [movieReviewPda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(movieReview.title), wallet.publicKey.toBuffer()],
    programId
  );

  // anchor ix identifier format
  // Sha256("<namespace>::<rust-identifier>")[..8],
  const ixBuffer = Buffer.from(
    getFirst8BytesOfSha256('global:add_movie_review')
  );

  // a String is a Vec<u8>
  // a Borsch String is represented in bytes by [len + array]
  const title_u8_vec = new TextEncoder().encode(movieReview.title);
  const title_u8_vec_length = Buffer.from(
    new Uint8Array(new BN(title_u8_vec.length).toArray('le', 4))
  );
  const desc_u8_vec = new TextEncoder().encode(movieReview.description);
  const desc_u8_vec_length = Buffer.from(
    new Uint8Array(new BN(desc_u8_vec.length).toArray('le', 4))
  );
  const rating_u8 = Buffer.from(
    new Uint8Array(new BN(movieReview.rating).toArray('le', 1))
  );

  const ixData = Buffer.concat([
    ixBuffer, // namespace + method_name
    title_u8_vec_length, // the length of the string
    title_u8_vec, // the string itself
    desc_u8_vec_length,
    desc_u8_vec,
    rating_u8,
  ]);

  const ix = new TransactionInstruction({
    data: ixData,
    keys: [
      { pubkey: movieReviewPda, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId,
  });

  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [wallet]);
  console.log(sig);

  return movieReviewPda;
};
