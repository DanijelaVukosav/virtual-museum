import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/model/event.model';
import { EventService } from '../services/event.service';
import { EventCategory } from 'src/app/model/event.category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Uplatnica } from 'src/app/model/uplatnica.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Karta } from 'src/app/model/karta.model';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-virtuelnakarta',
  templateUrl: './virtuelnakarta.component.html',
  styleUrls: ['./virtuelnakarta.component.css']
})
export class VirtuelnakartaComponent implements OnInit {

  public forma: FormGroup = new FormGroup({}); //forma
  public uplatnica: Uplatnica = new Uplatnica();
  posjeta: any;
  idPosjete: any;

  constructor(public formBuilder: FormBuilder, //formBuilder sluzi za kreiranje forme
    private snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,private loginService:LoginService,private router:Router) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.idPosjete = params.get('id');
    });
    this.forma = this.formBuilder.group({
      ime: [null, Validators.required],
      prezime: [null, Validators.required],
      brojKartice: [null, Validators.required],
      tipKartice: [null, Validators.required],
      datumIsticanja: [null, Validators.required],
      pin: [null, Validators.required]
    });
    this.http.get<any>('http://localhost:8080/posjete/'+this.idPosjete).toPromise().then(data => {    
      this.posjeta = data;
      console.log("Cijena posjete "+this.posjeta.idvirtuelnaposjeta+" je  "+ this.posjeta.cijena)
    });

  }

  save({ value, valid }: { value: Event, valid: boolean }) {
    if (valid) { //ako su OK

     //ponistimo prethodno unesene podatke
      this.snackBar.open("Podaci su sacuvani", undefined, { //i prikazemo poruku koja nestaje nakon 2s
        duration: 2000,
      });
      this.close();
    }
  }

  close() {
    
  }
  public async uplata(forma: any) {
    this.uplatnica.brojKartice = forma.value.brojKartice;
    this.uplatnica.pin = forma.value.pin;
    this.uplatnica.datumIsticanja = forma.value.datumIsticanja;
    this.uplatnica.ime = forma.value.ime;
    this.uplatnica.prezime = forma.value.prezime;
    this.uplatnica.tipKartice = forma.value.tipKartice;
    this.uplatnica.iznosUplate = this.posjeta.cijena;
    this.uplatnica.idvirtuelnaposjeta = this.idPosjete;
    console.log("UPLATNICA -----------------");
    console.log(this.uplatnica);

    const url = 'http://localhost:8081/VirtualBank/api/racuni';

    this.forma.reset(); 
    
    return await this.http
      .post<Uplatnica>(url, JSON.stringify(this.uplatnica), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
        console.log("Vraceno od banke >>>>>>> " + data);
        if (data != null)
        {
          let karta: Karta = new Karta();
          karta.idvirtuelnaposjeta = this.idPosjete;
          karta.token = this.loginService.activeUser?.token || "";
          console.log("KArta:");
          console.log(karta);
          this.http
            .post<Uplatnica>('http://localhost:8080/karta', JSON.stringify(karta), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
              console.log("Vracena karta >>>>>>> " + data);
              
            });
          this.router.navigate(['/muzeji']);
          return true;
          
        }
        return false;
          
      }).catch((err) => {
        this.snackBar.open("Podaci nisu dobri", undefined, {
          duration: 2000
        })
        return false;
      });
    
    console.log(forma.value.ime);

  }

}
