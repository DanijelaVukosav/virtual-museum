import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipMuzeja } from 'src/app/model/tip_muzeja.model';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  tipovi: TipMuzeja[] = [];

  constructor(private http:HttpClient) { }

  async getAll()
  {
    return await this.http.get<any>('http://localhost:8080/tipovi').toPromise().then(data => {
      this.tipovi = data;
      console.log("Procitano " + this.tipovi.length);
      return data;
    });
  }
}
