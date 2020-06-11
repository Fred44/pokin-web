import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-poker-new-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="pokerForm"
      fxLayout="column" fxflex="1 0 auto" fxLayoutAlign="start">

      <mat-form-field appearance="outline">
        <mat-label>Poker name</mat-label>
        <input matInput formControlName="pokerName" required>
        <mat-error *ngIf="pokerName.errors?.required">You must enter a value</mat-error>
      </mat-form-field>

      <div class="mat-form-field-wrapper">
        <mat-checkbox formControlName="public">Public</mat-checkbox>
      </div>

      <mat-form-field appearance="outline">
        <mat-label>Max duration of each poll</mat-label>
        <input matInput type="time" formControlName="pollDuration">
        <mat-error *ngIf="pollDuration.invalid">Not a valid duration</mat-error>
      </mat-form-field>
    </form>
  `,
  styles: [`
    form > * {
      margin: 5px 0;
    }
  `]
})
export class PokerNewFormComponent {

  @Input()
  pokerForm: FormGroup;

  get pokerName() { return this.pokerForm.get('pokerName'); }
  get pollDuration() { return this.pokerForm.get('pollDuration'); }

}
