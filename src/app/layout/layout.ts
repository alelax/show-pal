import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Footer],
  template: `
    <div class="app-container">
      <div class="content-container">
        <router-outlet />
      </div>
      <app-footer />
    </div>
  `,
  styleUrl: './layout.scss',
})
export class Layout {}
