import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formatDistanceToNow, parseISO, isValid, isFuture } from 'date-fns';
import { de } from 'date-fns/locale'
import { combineLatest, debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'wlnb-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  timeUntilInWords = ''
  targetDateControl = new UntypedFormControl(new Date())
  targetEventNameControl = new UntypedFormControl('')

  ngOnInit(): void {
    combineLatest([
      this.targetDateControl.valueChanges,
      this.targetEventNameControl.valueChanges.pipe(startWith(''), debounceTime(500))
    ])
    .subscribe(([dateAsString, eventName]) => {
      const date = parseISO(dateAsString)

      if (!isValid(date)) {
        this.timeUntilInWords = 'Bitte gib ein gültiges Datum ein.'
        return
      }

      if (!isFuture(date)) {
        this.timeUntilInWords = 'Das Datum wurde bereits erreicht :-) Das Warten hat eine Ende!'
        return
      }

      this.timeUntilInWords = `Es sind noch ${formatDistanceToNow(date, {locale: de})}`
      if (eventName) {
        this.timeUntilInWords = `${this.timeUntilInWords} bis ${eventName}`
      }
    })
  }
}
