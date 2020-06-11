import { Poll } from './poll';
import { User } from './user';

export interface PokerGame {
  id?: string;
  pokerName: string;
  public: boolean;
  cardSet: string;
  cards: string[];
  ownerUid: string;
  owner?: User;
  poll?: Poll;
  creationDate: Date;
}
