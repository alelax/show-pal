import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ShowModel } from '../../../core/show-model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-show-details',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatChip,
    MatCardSubtitle,
  ],
  templateUrl: './show-details.html',
  styleUrl: './show-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowDetails {
  show = input.required<ShowModel>();
}
