import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>Made with ❤️ by <span class="author">Nivek</span></p>
      </div>
    </footer>
  `,
  styleUrl: './footer.scss',
})
export class Footer {}
