import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatDialog} from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { Muzej } from 'src/app/model/muzej.model';
import { MuzejServiceService } from '../services/muzej-service.service';
import { TipMuzeja } from 'src/app/model/tip_muzeja.model';
import { TipService } from '../services/tip.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-muzej-edit',
  templateUrl: './muzej-edit.component.html',
  styleUrls: ['./muzej-edit.component.css'],
  template: 'passed in {{ data.naziv }}'
})
export class MuzejEditComponent implements OnInit {

  public form: FormGroup = new FormGroup({}); //forma
  public formaRegija: FormGroup = new FormGroup({}); //forma
  public formaGradova: FormGroup = new FormGroup({}); //forma
  public muzej: Muzej = new Muzej();
  public drzave: any;
  public regije: any;
  public gradovi: any;
  public tipovi: any;
  public tip: TipMuzeja = new TipMuzeja();
  public categories: Array<TipMuzeja> = [];

  constructor(public formBuilder: FormBuilder, //formBuilder sluzi za kreiranje forme
    private service: MuzejServiceService, //service koristimo za cuvanje podataka
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MuzejEditComponent>,private http:HttpClient,
    private tipService: TipService, @Inject(MAT_DIALOG_DATA) public muzejEdit: Muzej) {
    console.log("Iz konstruktora edita");
    console.log(muzejEdit);
    this.muzej = this.muzejEdit;
    
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      naziv: [this.muzej.naziv, Validators.required],
      adresa: [this.muzej.adresa, Validators.required],
      //grad: [this.muzej.grad, Validators.required],
      drzava: [this.muzej.drzava, Validators.required],
      brojTelefona: [this.muzej.brojTelefona, Validators.required],
      idTipa: [this.muzej.idTipa, Validators.required],
     // regija: [ null, Validators.required]
    });
    fetch('https://restcountries.com/v3.1/region/europe').then(function (res) {
      //console.log(res.json());
      console.log("Drzave");
      return res.json();
    }).then((data) => {
      console.log("Drzave");
      console.log(data);
      this.drzave = data;
     // this.grad3 = data[broj3].capital[0];

    }).catch(err => console.log("Error", err));

    await this.http.get<any>('http://localhost:8080/tipovi').toPromise().then(data => {
      this.categories = data;
      console.log("Procitano " + this.categories.length);
      
    });
    
    //prilikom ucitavanja stranice pravimo formu
    
  }

  save({ value }: { value: Muzej }) {
    value.longitude = this.muzej.longitude;
    value.latitude = this.muzej.latitude;
    if (this.muzejEdit.idMuzej != null)
    {
      value.idMuzej = this.muzejEdit.idMuzej;
      value.grad = this.muzej.grad;
      this.service.editMuzej(value);
    }
    else
    {
      value.grad = this.muzej.grad;
      this.service.sacuvajMuzej(value);
    }
    //this.service.add(value);//koristimo nas servis da ih sacuvamo
    console.log(value);
    console.log("Postojeci");
    console.log(this.muzej.grad);
    value.grad = this.muzej.grad;
    console.log("Novi");
    console.log(value);
    
    this.form.reset(); //ponistimo prethodno unesene podatke
    this.snackBar.open("Podaci su sacuvani", undefined, { //i prikazemo poruku koja nestaje nakon 2s
      duration: 2000,
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
  dohvatiRegije(ime:any)
  {
    console.log(this.drzave.find((data: any) => data.name.common == ime.value));
    let obj = this.drzave.find((data: any) => data.name.common == ime.value);
    console.log("Dvoslovna oznaka: " + obj.cca2);
    fetch('http://battuta.medunes.net/api/region/' + obj.cca2+'/all/?key=d03c4c4f731ef5483cd468643ebfe39a').then(function (res) {
      //console.log(res.json());
      console.log("Regioni");
      return res.json();
    }).then((data) => {
      console.log("Regioni");
      console.log(data);
      this.regije = data;
      this.formaRegija = this.formBuilder.group({
        regija: [null, Validators.required]
      });
     
      // this.grad3 = data[broj3].capital[0];

    }).catch(err => console.log("Error", err));
  }
  dohvatiGradove(ime: any) {
    console.log(ime.value);
    console.log(ime.value.region);
    console.log(this.drzave.find((data: any) => data.name.common == ime.value.country));
    //let obj = this.drzave.find((data: any) => data.name.common == ime.value);
    //console.log("Dvoslovna oznaka: " + obj.cca2);
    fetch('http://battuta.medunes.net/api/city/' + ime.value.country + '/search/?region='+ime.value.region+'&key=d03c4c4f731ef5483cd468643ebfe39a').then(function (res) {
      //console.log(res.json());
      console.log("Gradovi");
      return res.json();
    }).then((data) => {
      console.log("Gradovi");
      console.log(data);
      this.gradovi = data;
      this.formaGradova = this.formBuilder.group({
        grad: [this.muzej.grad, Validators.required]
      });

      // this.grad3 = data[broj3].capital[0];

    }).catch(err => console.log("Error", err));
  }
  ZapamtiGrad(grad: any) {
    console.log("GRADDDDDD: ");
    console.log(grad);
    console.log(grad.value);
    this.muzej.grad = grad.value;
    this.gradovi.forEach((element: any, index: number) => {
      if (element.city == grad.value) {
        console.log("Longitudee " + grad.value + "  -> " + element.longitude);
        this.muzej.longitude = element.longitude;
        this.muzej.latitude = element.latitude;
      }
    });
  }
}
