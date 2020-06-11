import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { unsubscribe } from '@app/shared';
import { CardSets, PokerOptions } from '@app/shared/model';
import { pokerAction, AppState, operationSelect } from '@app/store';

@Component({
  templateUrl: './poker-new-page.component.html',
  styleUrls: ['./poker-new-page.component.scss']
})
export class PokerNewPageComponent implements OnInit, OnDestroy {

  pokerForm: FormGroup;
  cardsForm: FormGroup;

  poker: PokerOptions;

  pending = false;

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<AppState>) {

    const cardSet = CardSets.list.filter(c => c.name === CardSets.default);
    this.poker = {
      pokerName: '',
      public: true,
      cardSet: CardSets.default,
      cards: cardSet[0].cards
    };

    this.pokerForm = this.fb.group({
      pokerName: [this.poker.pokerName, Validators.required],
      public: this.poker.public,
      pollDuration: [],
    });

    this.cardsForm = this.fb.group({
      cardSet: [this.poker.cardSet, Validators.required],
      cards: [this.poker.cards.join(','), Validators.required],
    });
  }

  ngOnInit(): void {
    this.subs.push(
      this.pokerForm.valueChanges.subscribe(val =>
        this.poker = {
          ...this.poker,
          ...val
        }
      ),
      this.cardsForm.valueChanges.subscribe(val =>
        this.poker = {
          ...this.poker,
          cardSet: val.cardSet,
          cards: val.cards.split(',')
        }
      ),
      this.store.pipe(
        select(operationSelect.isPending)
      ).subscribe(pending => this.pending = pending)
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  create() {
    this.store.dispatch(pokerAction.create({ options: this.poker }));
  }

}
