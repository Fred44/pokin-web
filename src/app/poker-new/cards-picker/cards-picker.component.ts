import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';

import { CardSet, CardSets } from '@app/shared/model';
import { unsubscribe } from '@app/shared';

@Component({
  selector: 'app-cards-picker',
  templateUrl: './cards-picker.component.html',
  styleUrls: ['./cards-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsPickerComponent implements OnInit, OnDestroy {

  @Input()
  cardsForm: FormGroup;

  cardSets = this.buildCardSets();

  cardsArr: string[] = [];

  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  private subs: Subscription[] = [];


  ngOnInit(): void {

    if (this.cardsForm) {
      this.cardsArr = this.cards.value.split(',');

      this.subs.push(
        this.cardSet.valueChanges.subscribe(val => this.generateCards(val))
      );
    }
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  addCard(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.cardsArr.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.change();
  }

  removeCard(card: string) {
    const index = this.cardsArr.indexOf(card);

    if (index >= 0) {
      this.cardsArr.splice(index, 1);
    }
    this.change();
  }

  private buildCardSets(): { code: string, label: string }[] {
    return CardSets.list.map((cs: CardSet) => (
      { code: cs.name, label: cs.name }
    )).concat(
      { code: 'Custom', label: 'Custom' }
    );
  }

  private generateCards(cardSetName: string) {
    const cardSet = CardSets.list.filter(c => c.name === cardSetName);

    if (cardSet && cardSet[0]) {
      this.cardsArr = cardSet[0].cards;
    } else {
      this.cardsArr = [];
    }

    this.change();
  }

  private change() {
    this.cards.setValue(this.cardsArr.join(','));
  }

  get cards() { return this.cardsForm.get('cards'); }
  get cardSet() { return this.cardsForm.get('cardSet'); }
}
