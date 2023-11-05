import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';
import {Time}  from '@angular/common'

import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSort } from '@angular/material/sort';
import {  MatDialogConfig } from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { Console } from 'console';



@Component({
  selector: 'app-posjete-korisnika',
  templateUrl: './posjete-korisnika.component.html',
  styleUrls: ['./posjete-korisnika.component.css']
})
export class PosjeteKorisnikaComponent implements OnInit {

  


  datum: Date = new Date();
  public lista = new Array<VirtuelnaPosjeta>();

  displayedColumns: string[] = ['muzej','datum', 'vrijemePocetka', 'trajanje', 'prezentuj'];
  dataSource = new MatTableDataSource<VirtuelnaPosjeta>();
  posjete: VirtuelnaPosjeta[] = [];

  constructor(private http: HttpClient, private loginService: LoginService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    
    
    this.http.get<any>('http://localhost:8080/posjete/karte/' + this.loginService.activeUser?.token).toPromise().then(data => {
      this.posjete = data;
      this.dataSource.data = data;
      this.lista = data;
      this.posjete = data;
      this.posjete.forEach((element: any) => {
        this.http.get<any>('http://localhost:8080/muzeji/' + element.idMuzej).toPromise().then(data => {
          
          element.idMuzej = data.naziv;
        });
      })
      this.posjete = this.buducePrezentacije();
      this.dataSource.data = this.posjete;
      console.log(data);
      
    });

    
  }

  async ngOnInit() {
  }


  ngOnDestroy() {
    //this.mySub.unsubscribe();
  }
 public periodicnaFunkcija() {
   this.snackBar.open("Predstava je zavrsena!", undefined, {
     duration: 100
   })
}

  prezentacija(element: any) {
    let pom = (element.datum + '').split('-');
    let godina = Number(pom[0]);
    let mjesec = Number(pom[1]);
    let dan = Number(pom[2]);
    let datum: Date = new Date();
    datum.setFullYear(godina, mjesec - 1, dan);
    let vrijeme: string = element.vrijemePocetka+'';
    let parsirano: any = vrijeme.split(":");
    
    let sati = Number(parsirano[0]);
    let minute = Number(parsirano[1]);
    
    datum.setHours(sati);
    datum.setMinutes(minute);
    console.log(datum);
    let trajanje: number = Number(element.trajanje);

    let krajPredstave: Date = new Date(datum+"");
    krajPredstave.setHours(datum.getHours() + trajanje);
    console.log("Kraj predstave : " + krajPredstave);
    if (krajPredstave < new Date())
    {
      this.snackBar.open("Predstava je zavrsena!", undefined, {
        duration: 2000
      })
    }
    console.log("DATUM PREDASTAVE pocetak");
    console.log(datum);
    console.log(new Date());
    if (datum > new Date())
    {
      this.snackBar.open("Prezentacija nije dostupna, sacekajte pocetak!", undefined, {
        duration: 2000
      })
    }
    this.router.navigate(['/prezentacija/' + element.idvirtuelnaposjeta]);
    //redirekcija na prezentaciju
  }



  public danasnjePrezentacije() {
    let today = new Date();
    return this.posjete.filter((e: any) => {
      return (e.datum?.getDay() == today.getDay()
        && e.datum?.getMonth() == today.getMonth()
        && e.datum?.getFullYear() == today.getFullYear());
    });
  }

  public buducePrezentacije() {
    return this.posjete.filter((element: any) =>
    {
      let pom = (element.datum + '').split('-');
      let godina = Number(pom[0]);
      let mjesec = Number(pom[1]);
      let dan = Number(pom[2]);
      let datum: Date = new Date();
      datum.setFullYear(godina, mjesec - 1, dan);
      let vrijeme: string = element.vrijemePocetka + '';
      let parsirano: any = vrijeme.split(":");

      let sati = Number(parsirano[0]);
      let minute = Number(parsirano[1]);

      datum.setHours(sati);
      datum.setMinutes(minute);
      let trajanje: number = Number(element.trajanje);

      let krajPredstave: Date = datum;
      krajPredstave.setHours(datum.getHours() + trajanje);
      console.log("Kraj predstave : " + krajPredstave);
     console.log("RAZLIKAAAAAa");
      
      console.log(krajPredstave>new Date());
      return krajPredstave > new Date();

    });
  }

}
