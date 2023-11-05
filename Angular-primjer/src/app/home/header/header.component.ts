import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logService: LoginService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.logService.logout();
  }

  isLogin(): boolean {
    return this.logService.activeUser != null;
  }
}
