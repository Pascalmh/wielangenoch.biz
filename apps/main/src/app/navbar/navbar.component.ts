import { Component, Inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'wlnb-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  template: ` <mat-toolbar color="primary">
    <span>Wie lange noch biz…?</span>
  </mat-toolbar>`,
})
export class NavbarComponent {}
