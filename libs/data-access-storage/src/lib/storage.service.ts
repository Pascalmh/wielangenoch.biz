import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(item: string, value: string): void {
    localStorage.setItem(item, value);
  }

  get(item: string): string {
    return localStorage.getItem(item) || '';
  }

  delete(item: string): void {
    localStorage.removeItem(item);
  }
}
