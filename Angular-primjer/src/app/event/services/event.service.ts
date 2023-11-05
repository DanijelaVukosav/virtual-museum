import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/event.model';
import { Muzej } from 'src/app/model/muzej.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly STORAGE_KEY: string = "events";
  public data: Array<Event> = [];

  constructor() { }

  public saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  public loadFromLocalStorage() {
    let data = localStorage.getItem(this.STORAGE_KEY) || "[]";
    this.data = JSON.parse(data) || [];
    this.data.forEach((e: any) => {
      e.date = new Date(e.date);
    });
  }

  public add(event: Event) {
    event.id = new Date().getTime();
    this.data.push(event);
    this.saveToLocalStorage();
  }

  public delete(id: number) {
    let position = -1;
    this.data.forEach((item, index) => {
      if (item.id == id) {
        position = index;
      }
    });
    if (position > -1) {
      this.data.splice(position, 1);
      this.saveToLocalStorage();
    }
  }

  public getAll() {
    this.loadFromLocalStorage();
    return this.data;
  }

  public getTodaysEvents() {
    let today = new Date();
    return this.getAll().filter((e: any) => {
      return (e.date?.getDate() == today.getDate()
        && e.date?.getMonth() == today.getMonth()
        && e.date?.getFullYear() == today.getFullYear());
    });
  }

  public getFutureEvents() {
    return this.getAll().filter((e: any) => e.date.getTime() >= new Date().getTime());
  }

}
