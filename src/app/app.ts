import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  template: `
    <app-layout />
  `
})
export class App {
  protected readonly title = signal('show-pal');
}
