import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent implements OnInit {

  @Input() theme = '';
  @Output() selected = new EventEmitter<string>();

  themes = [
    { code: 'DEFAULT-THEME', label: 'Light' },
    { code: 'DARK-THEME', label: 'Dark' },
  ];

  themeCtrl = new FormControl();

  ngOnInit() {
    this.themeCtrl.setValue(this.theme);
  }

  onThemeSelect() {
    this.selected.emit(this.themeCtrl.value);
  }
}
