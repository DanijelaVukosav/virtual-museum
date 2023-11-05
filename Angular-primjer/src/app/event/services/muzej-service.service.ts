import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  async getMuzeji(): Promise<any> {
    await this.http.get<any>('http://localhost:8080/muzeji').toPromise().then(data => {
      console.log(" iz servisa " + data);
      this.muzeji = data;
      console.log("Procitano " + this.muzeji.length);
    });
    return this.muzeji;
  }
  getMuzejiByID(id:string): Promise<Muzej> {
     return this.http.get<any>('http://localhost:8080/muzeji/'+id).toPromise().then(data => {
      console.log(" iz servisa " + data);
       this.muzeji = data;
       return data;
      console.log("Procitano " + this.muzeji.length);
    });
  }

  
}
