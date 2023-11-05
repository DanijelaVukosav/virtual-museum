import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-event-container',
  templateUrl: './event-container.component.html',
  styleUrls: ['./event-container.component.css']
})
export class EventContainerComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  public async logout() {
    this.loginService.logout()
  }


}
