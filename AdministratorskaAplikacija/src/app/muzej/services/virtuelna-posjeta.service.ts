import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';
import { Time } from "@angular/common";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class VirtuelnaPosjetaService {

  constructor(private router: Router,private http:HttpClient) { }
  dodajPosjetu(posjeta: VirtuelnaPosjeta)
  {
    this.router.navigate(['muzeji/posjeta/' + posjeta.idvirtuelnaposjeta]);

    
    return this.http.post<any>('http://localhost:8080/posjete', JSON.stringify(posjeta), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
      console.log(" Sacuvan muzej" + data);
      //  this.muzeji = data;
      this.router.navigate(['muzeji/posjeta/' + data.idvirtuelnaposjeta]);
      return data;

    });
  }
  editPosjeta(posjeta: any)
  {
   // this.router.navigate(['muzeji/posjete/'+posjeta.idMuzej]);

   this.http.post<any>('http://localhost:8080/posjete/'+posjeta.idvirtuelnaposjeta, JSON.stringify(posjeta), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
     // this.router.navigate(['muzeji/posjete/' + posjeta.idMuzej]);
     console.log("Zavrsi edit");
      //return data;

    });

  }
  deletePosjeta(element: any)
  {
    this.http.delete('http://localhost:8080/prezentacije/' + element.idvirtuelnaposjeta).toPromise().then(data => {
      console.log("Izbrisana prezentacija");
      this.http.delete('http://localhost:8080/posjete/' + element.idvirtuelnaposjeta).toPromise().then(data => {

        return data;
      });
    });
    
  }
}
