export interface CardSet {
  name: string;
  cards: string[];
}

export const CardSets = {
  default: 'Points',
  list: [
    { name: 'Points', cards: ['1', '2', '3', '5', '8', '13'] },
    { name: 'Hours', cards: ['0', '1', '2', '4', '8', '16'] }
  ]
};
