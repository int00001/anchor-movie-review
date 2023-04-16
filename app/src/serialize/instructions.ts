import { Payload } from './payload';

export enum MovieReviewInstructions {
  AddMovieReview = 0,
  UpdateMovieReview,
  DeleteMovieReview,
}

export const addMovieReviewSchema = new Map([
  [
    Payload,
    {
      kind: 'struct',
      fields: [
        ['id', 'u8'],
        ['title', 'string'],
        ['description', 'string'],
        ['rating', 'u8'],
      ],
    },
  ],
]);

export const updateMovieReviewSchema = new Map([
  [
    Payload,
    {
      kind: 'struct',
      fields: [
        ['id', 'u8'],
        ['title', 'string'],
        ['description', 'string'],
        ['rating', 'u8'],
      ],
    },
  ],
]);

export const deleteMovieReviewSchema = new Map([
  [
    Payload,
    {
      kind: 'struct',
      fields: [
        ['id', 'u8'],
        ['title', 'string'],
      ],
    },
  ],
]);
