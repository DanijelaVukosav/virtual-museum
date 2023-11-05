import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/model/event.model';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { EventService } from '../services/event.service';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MuzejServiceService } from '../services/muzej-service.service';
import { Muzej } from 'src/app/model/muzej.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  radioSel: any;
  radioSelected: string;
  //radioSelectedString: string;



  displayedColumns: string[] = ['idMuzej', 'naziv', 'adresa', 'grad','drzava', 'brojTelefona'];
  dataSource = new MatTableDataSource<Muzej>();
  muzeji: Muzej[] = [];
  //@ViewChild(MatSort, { static: true }) sort: MatSort|undefined;

  constructor(private service: EventService,private muzejService:MuzejServiceService,private http:HttpClient,private loginService:LoginService,
    private dialog: MatDialog, private snackBar: MatSnackBar,) {
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
  }

  add() {
    this.dialog.open(EventEditComponent, {
      width: '600px'
    })
      .afterClosed()
      .subscribe(result => {
       // this.dataSource.data = this.muzejService.getMuzeji();
      });
  }

  delete(element: any) {
    this.dialog.open(ConfirmModalComponent, {
      width: '300px'
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.service.delete(element.id);
          this.muzejService.getMuzeji().then(data => {
            this.muzeji = data;
            this.dataSource.data = data;
            console.log("delete " + this.muzeji.length);
            console.log(this.muzeji.pop()?.brojTelefona);
          });
        }
      });
  }
  pretrazi(patern:string )
  {
    console.log("Ukupno " + this.muzeji.length);
    console.log("ukucano " + this.radioSelected);
    if (this.radioSelected == 'naziv')
    {
      this.dataSource.data = this.muzeji.filter(muzej => muzej.naziv?.includes(patern));
    }
    else if (this.radioSelected == 'grad') {
      this.dataSource.data = this.muzeji.filter(muzej => muzej.grad?.includes(patern));
    }
    else
    {
      this.snackBar.open("Odaberite kategoriju pretrazivanja!", undefined, {
        duration: 2000
      })
    }
  }

}
