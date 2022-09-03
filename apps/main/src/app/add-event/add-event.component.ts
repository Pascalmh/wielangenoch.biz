import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '@wlnb/data-access-storage';
import { parseISO, isValid, isFuture, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { combineLatest, startWith, debounceTime } from 'rxjs';

@Component({
  selector: 'wlnb-add-event',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  template: `
    <div class="m-auto text-center">
      <div
        class="mt-5 p-8 bg-gray-700 filter drop-shadow-md bordered-md rounded-md"
      >
        <div>
          <label for="target-date-input" class="block text-gray-400">
            Wann?:
          </label>
          <input
            id="target-date-input"
            type="date"
            [formControl]="targetDateControl"
          />
        </div>

        <div class="mt-2">
          <label for="target-event-name-input" class="block text-gray-400">
            Was?:
          </label>
          <input
            id="target-event-name-input"
            type="text"
            [formControl]="targetEventNameControl"
          />
        </div>

        <p class="mt-4 text-white" *ngIf="timeUntilInWords">
          {{ timeUntilInWords }}
        </p>

        <div class="mt-4">
          <button
            (click)="save()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddEventComponent implements OnInit {
  timeUntilInWords = '';
  targetDateControl = new FormControl<Date>(new Date());
  targetEventNameControl = new FormControl('');

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    let savedEventTitle = '';
    let savedEventDate = null;

    const savedEvent = this.storageService.get('events')
      ? JSON.parse(this.storageService.get('events'))
      : [];

    if (savedEvent.length > 0) {
      savedEventTitle = savedEvent[0].title;
      savedEventDate = savedEvent[0].date;

      this.targetEventNameControl.setValue(savedEventTitle);
      this.targetDateControl.setValue(savedEventDate);
    }

    combineLatest([
      this.targetDateControl.valueChanges.pipe(startWith(savedEventDate)),
      this.targetEventNameControl.valueChanges.pipe(
        startWith(savedEventTitle),
        debounceTime(500)
      ),
    ]).subscribe(([dateAsString, eventName]) => {
      const date = parseISO(dateAsString);

      if (!isValid(date)) {
        this.timeUntilInWords = 'Bitte gib ein gültiges Datum ein.';
        return;
      }

      if (!isFuture(date)) {
        this.timeUntilInWords =
          'Das Datum wurde bereits erreicht :-) Das Warten hat eine Ende!';
        return;
      }

      this.timeUntilInWords = `Es sind noch ${formatDistanceToNow(date, {
        locale: de,
      })}`;
      if (eventName) {
        this.timeUntilInWords = `${this.timeUntilInWords} bis ${eventName}`;
      }
    });
  }

  save() {
    const events = [
      {
        title: this.targetEventNameControl.value,
        date: this.targetDateControl.value,
      },
    ];

    this.storageService.set('events', JSON.stringify(events));
  }
}
