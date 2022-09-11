import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';
import { StorageService } from '@wlnb/data-access-storage';

@Component({
  standalone: true,
  selector: 'wlnb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    AsyncPipe,
    NgForOf,
    DatePipe,
  ],
})
export class DashboardComponent implements OnInit {
  cards: { title: string; date: Date }[] = [];

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    this.cards = this.storageService.get('events')
      ? JSON.parse(this.storageService.get('events')).map((event: any) => ({
          title: event.title,
          date: new Date(event.date),
        }))
      : [];

    console.log('cards', this.cards);
  }
}
