import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatDialog} from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { MuzejServiceService } from '../services/muzej-service.service';
import { TipMuzeja } from 'src/app/model/tip_muzeja.model';
import { TipService } from '../services/tip.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VirtuelnaPosjetaService } from '../services/virtuelna-posjeta.service';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';

@Component({
  selector: 'app-virtuelna-posjeta',
  templateUrl: './virtuelna-posjeta.component.html',
  styleUrls: ['./virtuelna-posjeta.component.css']
})
export class VirtuelnaPosjetaComponent implements OnInit {

  public form: FormGroup = new FormGroup({}); //forma
  public posjeta: VirtuelnaPosjeta = new VirtuelnaPosjeta();

  constructor(public formBuilder: FormBuilder, //formBuilder sluzi za kreiranje forme
    private service: VirtuelnaPosjetaService, //service koristimo za cuvanje podataka
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<VirtuelnaPosjetaComponent>, private http: HttpClient,
    private tipService: TipService, @Inject(MAT_DIALOG_DATA) public posjetaEdit:VirtuelnaPosjeta) {
    this.posjeta = this.posjetaEdit;

  }

  async ngOnInit() {
    console.log("Datum >>>>>>>>>>>>pojeste>>>>>>>>" + this.posjeta.datum);
    let novi: Date = new Date(this.posjeta.datum + "");
    console.log("Noviiiiii::::" + novi);

    this.form = this.formBuilder.group({
      datum: [this.posjeta.datum, Validators.required],
      trajanje: [this.posjeta.trajanje, Validators.required],
      vrijemePocetka: [this.posjeta.vrijemePocetka, Validators.required]
    });
    

  }

  async save({ value }: { value: VirtuelnaPosjeta }) {
    
    value.idMuzej = this.posjeta.idMuzej;
    let pom:Date = new Date(value.datum + "");
    
    let vrijeme = (value.vrijemePocetka + "").split(":");
    pom.setHours(Number(vrijeme[0]));
    pom.setMinutes(Number(vrijeme[1]));
    pom.setSeconds(0);
    pom.setMilliseconds(0);
    value.datum = pom;
    console.log("DATUM>>>>>>>>>>>>>>");
    console.log(pom);
    if (this.posjeta.idvirtuelnaposjeta != null)
    {
      value.idvirtuelnaposjeta= this.posjeta.idvirtuelnaposjeta;
      //this.service.editPosjeta(value);
      this.http.post<any>('http://localhost:8080/posjete/' + value.idvirtuelnaposjeta, JSON.stringify(value), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
        // this.router.navigate(['muzeji/posjete/' + posjeta.idMuzej]);
        console.log("Zavrsi edit");
        //return data;

      });
    }
    else
    {
      this.service.dodajPosjetu(value);
    }
    
    this.form.reset(); //ponistimo prethodno unesene podatke
    this.snackBar.open("Podaci su sacuvani", undefined, { //i prikazemo poruku koja nestaje nakon 2s
      duration: 2000,
    });
    await new Promise(f => setTimeout(f, 500));
    this.close();
    
  }

  close() {
    this.dialogRef.close();
  }
  
  
}
