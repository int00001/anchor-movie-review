import * as anchor from '@coral-xyz/anchor';
import { IDL } from '../../../target/types/anchor_movie_review';

export const getProgram = (provider: anchor.Provider, programId: string) =>
  new anchor.Program(IDL, programId, provider);
