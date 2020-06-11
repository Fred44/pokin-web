import { Timestamp } from '@firebase/firestore-types';

export interface Poker {
  id: string;
  pokerName: string;
  cardSet: string;
  cards: string[];
  public: boolean;
  ownerUid: string;
  pollDuration: string;
  creationDate: Timestamp;
}

export interface Timer {
  time: number;
  refDate: Timestamp;
}

export interface Votes {
  [userId: string]: Vote;
}

export interface Vote {
  card: string;
  at: Timestamp;
}

export interface Poll {
  id: string;
  question: string;
  status: 'PAUSED' | 'RUNNING' | 'CLOSED';
  timer: Timer;
  votesAreShown: boolean;
  votes: Votes;
  creationDate: Timestamp;
  updateDate: Timestamp;
}
