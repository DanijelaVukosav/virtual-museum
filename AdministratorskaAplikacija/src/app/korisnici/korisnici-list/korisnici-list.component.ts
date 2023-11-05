import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';
import { KorisniciService } from '../services/korisnici.service';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { LoginService } from 'src/app/auth/services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korisnici-list',
  templateUrl: './korisnici-list.component.html',
  styleUrls: ['./korisnici-list.component.css']
})
export class KorisniciListComponent implements OnInit {

  adioSel: any;
  radioSelected: string;
  public korisnici = new Array<User>();
  //radioSelectedString: string;



  displayedColumns: string[] = ['username', 'ime', 'prezime', 'registracija', 'blokiraj', 'promijeniSifru'];//
  public dataSource = new MatTableDataSource<User>();
  //@ViewChild(MatSort, { static: true }) sort: MatSort|undefined;

  constructor(private service: KorisniciService, private http: HttpClient,
    private dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.radioSelected = "option1";
    this.http.get<any>('http://localhost:8080/korisnici').toPromise().then(data => {
      console.log(" iz await " + data);
      this.korisnici = data;
      //this.korisnici[0].blokiranNalog = 'T';
      this.dataSource.data = data;
      console.log(data);
    });
  }

  async ngOnInit() {
   /* this.service.getRegistrovaniKorisnici().then((data: any) => {
      data[0].blokiranNalog = "T";
      console.log(data);
      this.dataSource = data;
      // this.grad3 = data[broj3].capital[0];

    });*/
    //this.muzeji = this.muzejService.getMuzeji();
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };
    let options = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.loginService.activeUser?.token}`) };

    await this.http.get<any>('http://localhost:8080/muzeji').toPromise().then(data => {
      console.log(" iz await " + data);
      this.muzeji = data;
      this.dataSource.data = data;
      console.log("Procitano " + this.muzeji.length);
    });*/

  }

  odobriRegistraciju(element: any) {
    if (element.odobrenNalog.startsWith('F'))
      element.odobrenNalog = 'T';
    else
      element.odobrenNalog = 'F';
    this.service.updateKorisnika(element);
  }
  blokirajKorisnika(element: any) {
    if (element.blokiranNalog.startsWith('F'))
      element.blokiranNalog = 'T';
    else
      element.blokiranNalog = 'F';
    this.service.updateKorisnika(element);
   /* const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = element;

    this.dialog.open(MuzejEditComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        this.http.get<any>('http://localhost:8080/muzeji').toPromise().then(data => {
          console.log(" >>>>>>>>>>>>>>>NOVI>>>>>>>> " + data);
          this.muzeji = data;
          this.dataSource.data = data;
          console.log("Procitano " + this.muzeji.length);
        });
      });*/
  }

  promijeniSifru(element: any) {
    let broj1 = Math.floor((Math.random() * 10000000) + 1);
    element.password = broj1;

    console.log("KLika");
    this.service.updateKorisnika(element);
  }
  

  omogucenNalog(element: any):boolean
  {
    console.log(element.odobrenNalog.startsWith("T"));
    return element.odobrenNalog.startsWith("T");
  }

}
