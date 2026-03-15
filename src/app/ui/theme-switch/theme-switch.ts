import { ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-theme-switch',
  imports: [MatIcon, MatFabButton],
  template: `
    <button matFab aria-label="Toggle theme" (click)="toggleTheme()">
      <mat-icon>{{ isDarkTheme() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitch {
  #document = inject(DOCUMENT);
  isDarkTheme = signal(this.#document.body.style.getPropertyValue('color-scheme') === 'dark');

  toggleTheme() {
    this.#document.body.style.setProperty('color-scheme', this.isDarkTheme() ? 'dark' : 'light');
    this.isDarkTheme.update((dark) => !dark);
  }
}
