import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MuzejServiceService } from '../services/muzej-service.service';
import { MuzejEditComponent } from '../muzej-edit/muzej-edit.component';
import { VirtuelnaPosjetaComponent } from '../virtuelna-posjeta/virtuelna-posjeta.component';
import { VirtuelnaPosjetaService } from '../services/virtuelna-posjeta.service';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posjete-list',
  templateUrl: './posjete-list.component.html',
  styleUrls: ['./posjete-list.component.css']
})
export class PosjeteListComponent implements OnInit {
  idMuzej: number=0;
  
  public lista = new Array<VirtuelnaPosjeta>();
  
  displayedColumns: string[] = ['datum', 'vrijemePocetka', 'trajanje', 'delete','edit'];
  dataSource = new MatTableDataSource<VirtuelnaPosjeta>();
  posjete: VirtuelnaPosjeta[] = [];

  constructor(private posjetaService: VirtuelnaPosjetaService, private http: HttpClient, private loginService: LoginService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.route.params.subscribe(paramsId => {
      this.idMuzej = paramsId.id;
    });
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
    
    this.http.get<any>('http://localhost:8080/posjete/muzej/'+this.idMuzej,options).toPromise().then(data => {
      this.posjete = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }

  async ngOnInit() {
    
  /*  const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };
    let options = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.loginService.activeUser?.token}`) };

    await this.http.get<any>('http://localhost:8080/posjete/muzej/' + this.idMuzej).toPromise().then(data => {
      
      this.posjete = data;
      this.dataSource.data = data;
    });*/

  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    let vp = new VirtuelnaPosjeta();
    vp.idMuzej = this.idMuzej;
    dialogConfig.data = vp;

    this.dialog.open(VirtuelnaPosjetaComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
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
        this.http.get<any>('http://localhost:8080/posjete/muzej/' + this.idMuzej,options).toPromise().then(data => {
          console.log("Posjete:");
          console.log(data);
          this.posjete = data;
          this.dataSource.data = data;
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

    this.dialog.open(VirtuelnaPosjetaComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
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
        
        this.http.get<any>('http://localhost:8080/posjete/muzej/' + this.idMuzej,options).toPromise().then(data => {   
          console.log("Ocitaaaaaaaaa ponovo");
          this.posjete = data;
          this.dataSource.data = data;
        });
      });
  }

  delete(element: any) {
    this.dialog.open(ConfirmModalComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.http.delete('http://localhost:8080/prezentacije/' + element.idvirtuelnaposjeta).toPromise().then(data => {
            console.log("Izbrisana prezentacija");
            this.http.delete('http://localhost:8080/posjete/' + element.idvirtuelnaposjeta).toPromise().then(data => {

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
              this.http.get<any>('http://localhost:8080/posjete/muzej/' + this.idMuzej, options).toPromise().then(data => {

                this.posjete = data;
                this.dataSource.data = data;
              });
            });
          });
          
           
        }
      });
  }

}
