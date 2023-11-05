import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Muzej } from 'src/app/model/muzej.model';

@Injectable({
  providedIn: 'root'
})
export class MuzejServiceService {
  muzejUrl = 'http://localhost:8080/muzeji';
  
  muzeji: Muzej[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:8080/muzeji').toPromise().then(data => {
      console.log(" iz koonstruktora " + data);
      this.muzeji = data;
      console.log("Procitano " + this.muzeji.length);
    });
  }

   getMuzeji(){
   return  this.http.get('http://localhost:8080/muzeji');
  }
  getMuzejiByID(id: string): Promise<Muzej> {
    return this.http.get<any>('http://localhost:8080/muzeji/' + id).toPromise().then(data => {
      console.log(" iz servisa " + data);
      this.muzeji = data;
      return data;
      console.log("Procitano " + this.muzeji.length);
    });
  }
  sacuvajMuzej(muzej: Muzej)
  {
    return this.http.post<any>('http://localhost:8080/muzeji', JSON.stringify(muzej), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
      console.log(" Sacuvan muzej" + data);
    //  this.muzeji = data;
    
      return data;
      
      console.log("Procitano " + this.muzeji.length);
    });
  }
  editMuzej(muzej: Muzej) {
    return this.http.post<any>('http://localhost:8080/muzeji/'+muzej.idMuzej, JSON.stringify(muzej), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
      console.log(" Sacuvan muzej" + data);
      //  this.muzeji = data;
      return data;
      console.log("Procitano " + this.muzeji.length);
    });
  }
  delete(id: number)
  {
    return this.http.delete('http://localhost:8080/muzeji/'+id).toPromise().then(data => {
      console.log("Izbrisan muzej" + data);
      console.log("Procitano " + this.muzeji.length);
    }).catch((err: HttpErrorResponse) => {
      alert("Muzej ne moze biti izbrisan zbog postojanja posjete ili drugog objekta!");
      console.error('An error occurred:', err.error);
    });;
  }

}
