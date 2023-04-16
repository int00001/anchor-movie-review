import { AccountData } from './account-data';

export const movieReviewAccountSchema = new Map([
  [
    AccountData,
    {
      kind: 'struct',
      fields: [
        ['name', [8]],
        ['reviewer', [32]],
        ['rating', 'u8'],
        ['title', 'string'],
        ['description', 'string'],
      ],
    },
  ],
]);
