import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, switchMap } from 'rxjs';
import { ShowsLoaderService } from '../../core/shows-loader.service';
import { ShowDetails } from '../../ui/shows/show-details/show-details';

@Component({
  selector: 'app-shows',
  imports: [ShowDetails],
  template: `
    <div class="shows-container">
      @for (show of shows(); track show.id) {
        <app-show-details [show]="show" />
      }
    </div>
  `,
  styles: [
    `
      .shows-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shows {
  #showsLoader = inject(ShowsLoaderService);

  showIds = input.required<string[]>();

  shows = toSignal(
    toObservable(this.showIds).pipe(
      switchMap((ids) =>
        ids.length > 0 ? forkJoin(ids.map((id) => this.#showsLoader.loadById(id))) : [],
      ),
    ),
    { initialValue: [] },
  );
}
