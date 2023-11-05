import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  brojKorisnika: any;

  constructor(private http: HttpClient) { }
  
  getRegistrovaniKorisnici():any
  {
    return fetch('http://localhost:8080/korisnici').then(function (res) {
      //console.log(res.json());
      console.log("Drzave");
      return res.json();
    });
  }
  updateKorisnika(korisnik: any)
  {
    return this.http.post<any>('http://localhost:8080/korisnici/' + korisnik.token, JSON.stringify(korisnik), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
      console.log(" Sacuvan muzej" + data);
      //  this.muzeji = data;
      return data;
      
    });
  }
}
