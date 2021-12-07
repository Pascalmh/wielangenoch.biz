import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { de } from 'date-fns/locale'

@Component({
  selector: 'wlnb-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  timeUntilInWords = '';
  targetDateControl = new FormControl(new Date());

  ngOnInit(): void {
    this.targetDateControl.valueChanges.subscribe(val => {
      const date = parseISO(val)

      this.timeUntilInWords = isValid(date)
        ? formatDistanceToNow(date, {locale: de})
        : ''
    })
  }
}
