
export interface PollOptions {
  question: string;
}

export interface Poll {
  pokerId: string;
  id: string;
  question: string;
  votesAreShown: boolean;
  votes: [Vote];
  status: string;
  timer: TimerState;
  creationDate: Date;
  updateDate: Date;
}

export interface Vote {
  userId: string;
  at: Date;
  card: string;
}

export interface Player {
  name: string;
  picture?: string;
}

export interface TimerState {
  pause: boolean;
  time: number;
  refDate: Date;
}
