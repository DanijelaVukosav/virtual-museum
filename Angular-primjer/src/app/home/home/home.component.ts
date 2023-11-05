import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event/services/event.service';
import { Event } from 'src/app/model/event.model';
import { EventCategory } from 'src/app/model/event.category.model';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public eventsToday: Array<Event> = []; //danasnji
  public events: Array<Event> = []; //svi za filter
  public categories: Array<EventCategory> = [];

  constructor(private service: EventService, private logService: LoginService) {
    this.events = this.service.getFutureEvents();
    this.eventsToday = this.service.getTodaysEvents();
  }

  ngOnInit() {
  }

  filterCategory(event: any) {
    let category = event.value.id;
    this.events = this.service.getFutureEvents().filter((e: any) => {
      return e.category.id == category
    });
  }

  onF1DataLoad(result: string) {
    console.log("F1:", result);
  }


}
