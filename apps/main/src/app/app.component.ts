import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'wlnb-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent {}
