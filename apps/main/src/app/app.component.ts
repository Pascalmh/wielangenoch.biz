import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { formatDistanceToNow, parseISO, isValid, isFuture } from 'date-fns';
import { de } from 'date-fns/locale';
import { combineLatest, debounceTime, startWith } from 'rxjs';
import { StorageService } from '@wlnb/data-access-storage';
import { DisplayTimeRemainingComponent } from './display-time-remaining/display-time-remaining.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'wlnb-root',
  templateUrl: './app.component.html',
  imports: [NgIf, ReactiveFormsModule, DisplayTimeRemainingComponent],
})
export class AppComponent implements OnInit {
  timeUntilInWords = '';
  targetDateControl = new UntypedFormControl(new Date());
  targetEventNameControl = new UntypedFormControl('');

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
