import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pristup-administratorima',
  templateUrl: './pristup-administratorima.component.html',
  styleUrls: ['./pristup-administratorima.component.css']
})
export class PristupAdministratorimaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Udje u inicijalizaciju");
  }

}
