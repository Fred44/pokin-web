import { User } from '@app/shared/model';

export interface SearchItem {
  id: string;
  pokerName: string;
  public: boolean;
  cards: string[];
  cardSet: string;
  owner: User;
  creationDate: Date;
}
