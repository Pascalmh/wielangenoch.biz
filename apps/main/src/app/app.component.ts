import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatDistanceToNow, parseISO, isValid, isFuture } from 'date-fns';
import { de } from 'date-fns/locale'

@Component({
  selector: 'wlnb-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  timeUntilInWords = ''
  targetDateControl = new FormControl(new Date())

  ngOnInit(): void {
    this.targetDateControl.valueChanges.subscribe(val => {
      const date = parseISO(val)

      if (!isValid(date)) {
        this.timeUntilInWords = 'Bitte gib ein gültiges Datum ein.'
        return
      }

      if (!isFuture(date)) {
        this.timeUntilInWords = 'Das Datum wurde bereits erreicht :-) Das Warten hat eine Ende!'
        return
      }

      this.timeUntilInWords = formatDistanceToNow(date, {locale: de})
    })
  }
}
