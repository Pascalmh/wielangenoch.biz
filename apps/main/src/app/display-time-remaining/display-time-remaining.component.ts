import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, startWith } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'wlnb-display-time-remaining',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-title>{{ what }}</mat-card-title>
      <mat-card-content>{{ when }}</mat-card-content>
    </mat-card>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTimeRemainingComponent implements OnInit {
  @Input() what = '';

  @Input() when = new Date();

  remaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    interval(1000)
      .pipe(startWith(this.getTimeRemaining()))
      .subscribe(() => {
        this.remaining = this.getTimeRemaining();

        this.ref.detectChanges();
      });
  }

  private getTimeRemaining() {
    const now = new Date();
    const when = new Date(this.when);

    let seconds = Math.floor((when.getTime() - now.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    return { days, hours, minutes, seconds };
  }
}
