import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from 'src/app/korisnici/services/korisnici.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  brojKorisnika: number;

  constructor(private http:HttpClient,private service:KorisniciService) { 
    this.brojKorisnika = 30;
    this.service.getRegistrovaniKorisnici().then((data:any) => {
     
      console.log(data);
      this.brojKorisnika =  data.length;
      // this.grad3 = data[broj3].capital[0];

    });
    
  }

  ngOnInit(): void {
    this.brojKorisnika = 30;
  }

}
