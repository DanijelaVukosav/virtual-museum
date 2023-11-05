import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MuzejServiceService } from '../services/muzej-service.service';
import { MuzejEditComponent } from '../muzej-edit/muzej-edit.component';
import { VirtuelnaPosjetaComponent } from '../virtuelna-posjeta/virtuelna-posjeta.component';
import { VirtuelnaPosjetaService } from '../services/virtuelna-posjeta.service';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-muzej-list',
  templateUrl: './muzej-list.component.html',
  styleUrls: ['./muzej-list.component.css']
})
export class MuzejListComponent implements OnInit {

  radioSel: any;
  radioSelected: string;
  public lista = new Array<Muzej>();
  //radioSelectedString: string;



  displayedColumns: string[] = ['idMuzej', 'naziv', 'adresa', 'grad', 'drzava', 'brojTelefona', 'delete', 'edit','dodajLokaciju','posjete'];
  dataSource = new MatTableDataSource<Muzej>();
  muzeji: Muzej[] = [];
  //@ViewChild(MatSort, { static: true }) sort: MatSort|undefined;

  constructor( private muzejService: MuzejServiceService, private http: HttpClient, private loginService: LoginService,
    private dialog: MatDialog, private snackBar: MatSnackBar,private route:Router) {
    this.radioSelected = "option1";
    
   
  }

   async ngOnInit() {
    //  this.dataSource.data = this.service.getAll();
    //this.muzeji = this.muzejService.getMuzeji();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    let str:any = "";
    if (this.loginService.activeUser)
      str=this.loginService.activeUser?.token;
    let options = { headers: new HttpHeaders().set('Authorization', `Basic` + btoa(str)) };

    await this.http.get<any>('http://localhost:8080/muzeji',options).toPromise().then(data => {
      console.log(" iz await " + data);
      this.muzeji = data;
      this.dataSource.data = data;
      console.log("Procitano " + this.muzeji.length);
    });
    
  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = new Muzej();
    
    this.dialog.open(MuzejEditComponent, dialogConfig)
      .afterClosed()
      .subscribe(async result => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
          })
        };
        let str: any = "";
        if (this.loginService.activeUser)
          str = this.loginService.activeUser?.token;
        let options = { headers: new HttpHeaders().set('Authorization', `Basic` + btoa(str)) };

        await this.http.get<any>('http://localhost:8080/muzeji', options).toPromise().then(data => {
          console.log(" iz await " + data);
          this.muzeji = data;
          this.dataSource.data = data;
          console.log("Procitano " + this.muzeji.length);
        });
      });
  }
  edit(element: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = element;

    this.dialog.open(MuzejEditComponent, dialogConfig)
      .afterClosed()
      .subscribe(async result => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
          })
        };
        let str: any = "";
        if (this.loginService.activeUser)
          str = this.loginService.activeUser?.token;
        let options = { headers: new HttpHeaders().set('Authorization', `Basic` + btoa(str)) };

        await this.http.get<any>('http://localhost:8080/muzeji', options).toPromise().then(data => {
          console.log(" iz await " + data);
          this.muzeji = data;
          this.dataSource.data = data;
          console.log("Procitano " + this.muzeji.length);
        });
      });
  }

  delete(element: any) {
    this.dialog.open(ConfirmModalComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          this.http.delete('http://localhost:8080/muzeji/' + element.idMuzej).toPromise().then(data => {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
              })
            };
            let str: any = "";
            if (this.loginService.activeUser)
              str = this.loginService.activeUser?.token;
            let options = { headers: new HttpHeaders().set('Authorization', `Basic` + btoa(str)) };

            this.http.get<any>('http://localhost:8080/muzeji', options).toPromise().then(muzejii => {
              console.log(" iz await " + muzejii);
              this.muzeji = muzejii;
              this.dataSource.data = muzejii;
              console.log("Procitano " + this.muzeji.length);
            });
          }).catch((err: HttpErrorResponse) => {
            alert("Muzej ne moze biti izbrisan zbog postojanja posjete ili drugog objekta!");
            console.error('An error occurred:', err.error);
          });;
          
        }
      });
  }
  pretrazi(patern: string) {
    console.log("Ukupno " + this.muzeji.length);
    console.log("ukucano " + this.radioSelected);
    if (this.radioSelected == 'naziv') {
      this.dataSource.data = this.muzeji.filter(muzej => muzej.naziv?.includes(patern));
    }
    else if (this.radioSelected == 'grad') {
      this.dataSource.data = this.muzeji.filter(muzej => muzej.grad?.includes(patern));
    }
    else {
      this.snackBar.open("Odaberite kategoriju pretrazivanja!", undefined, {
        duration: 2000
      })
    }
  }
  dodajPosjetu(element: any)
  {
    /*const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    let posjeta = new VirtuelnaPosjeta();
    posjeta.idMuzej = element.idMuzej;
    dialogConfig.data = posjeta;

    this.dialog.open(VirtuelnaPosjetaComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        console.log("Rezultat posle zatvaranja");
        console.log(result);
      });*/
    this.route.navigate(['/muzeji/posjete/', element.idMuzej]);
  }
  promijeniLokaciju(muzej: any)
  {
    this.route.navigate(['/muzeji/mapa/'+muzej.idMuzej]);
  }

}
