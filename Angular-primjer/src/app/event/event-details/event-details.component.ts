import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HeaderComponent } from 'src/app/home/header/header.component';
import { EventService } from '../services/event.service';
import { MuzejServiceService } from '../services/muzej-service.service';
import { Muzej } from 'src/app/model/muzej.model';
import { ConstantPool } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { VirtuelnakartaComponent } from '../virtuelnakarta/virtuelnakarta.component';
import { MatDialog } from '@angular/material/dialog';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  weatherPom1: any;
  weatherPom2: any;
  weatherPom3: any;
  public grad1: any;
  grad2: any;
  grad3: any;
  //muzej: Muzej;
  public muzej: any;
  posjete: any;
  public drzave: any;
  public regije: any;
  public gradovi: Array<any> = [];
  latitude= 0.0;
  longitude= 0.00;

  constructor(private _activatedRoute: ActivatedRoute, private router: Router, private weather: WeatherService, private muzeji: MuzejServiceService, private http: HttpClient,private dialog: MatDialog) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(async params => {
      // in the route we created edit route we set newsfeedid as param so we get it here
      const NewsfeedID = params.get('id');
      if (NewsfeedID) {
        await this.muzeji.getMuzejiByID(NewsfeedID).then(data => {
          this.muzej = data;
          this.longitude = this.muzej.longitude;
          this.latitude = this.muzej.latitude;

          console.log(" iz servisa " + data);
        });
        console.log("Dobijeni muzej");
        console.log(this.muzej);
        console.log(NewsfeedID);
      }
      fetch('https://restcountries.com/v3.1/region/europe').then(function (res) {
        //console.log(res.json());
        console.log("Drzave");
        return res.json();
      }).then((data) => {
        console.log("Drzave");
        console.log(data);
        this.drzave = data;
        this.drzave.forEach((drzava: any, index: number) => {
          if (drzava.name.common == this.muzej.drzava)
          {
            fetch('http://battuta.medunes.net/api/region/' + drzava.cca2 + '/all/?key=d03c4c4f731ef5483cd468643ebfe39a').then(function (res) {
              //console.log(res.json());
             // console.log("Regioni");
              return res.json();
            }).then((data) => {
              //console.log("Regioni");
            //  console.log(data);
              this.regije = data;
              this.regije.forEach((regija: any, index: number) => {
                fetch('http://battuta.medunes.net/api/city/' + drzava.cca2 + '/search/?region=' + regija.region + '&key=d03c4c4f731ef5483cd468643ebfe39a').then(function (res) {
                  //console.log(res.json());
                  //console.log("Gradovi");
                  return res.json();
                }).then((data) => {
                 // console.log("Gradovi");
                 // console.log(data);
                  data.forEach((grad:any) => {
                    this.gradovi.push(grad);
                  });
                  this.pomocna();
                  
                }).catch(err => console.log("Error", err));
              
              });
              

            }).catch(err => console.log("Error", err));
          }
        });
        
      }).catch(err => console.log("Error", err));
      await new Promise(f => setTimeout(f, 1000));
      
    })
  }
  public inicijalizujPrognozu(data:any):void
  {
    let broj1 = Math.random() * (53 - 0) + 0;
    this.weather.getWeatherDataByTownName(data[0].capital).subscribe(data => {
      this.weatherPom1 = data;
    });

  }
  kupiKartu(id :number) {
    this.router.navigate(['/muzeji/karta/'+id]);
  }

  pomocna()
  {
    console.log("Drzaveeeee");
    console.log(this.drzave);
    console.log("regije:");
    console.log(this.regije);
    console.log("GRadovi drzave");
    console.log(this.gradovi);

    let broj1 = Math.floor((Math.random() * this.gradovi.length - 1) + 1);
    let broj2 = Math.floor((Math.random() * this.gradovi.length - 1) + 1);
    let broj3 = Math.floor((Math.random() * this.gradovi.length - 1) + 1);
    this.grad1 = this.gradovi[broj1].city;
    console.log("grad1" + this.grad1 + "   broj " + broj1);
    console.log(this.grad1);
    this.grad2 = this.gradovi[broj2].city;
    this.grad3 = this.gradovi[broj3].city;
    console.log(this.grad2);
    console.log(this.grad3);


    this.weather.getWeatherDataByTownName(this.grad1).subscribe(data => {
      console.log("DATA FROM WETATHRE 1 SERVICE ZA GRAD" + this.grad1);

      console.log(data);
      this.weatherPom1 = data;
      console.log(this.weatherPom1.name);

    });
    this.weather.getWeatherDataByTownName(this.grad2).subscribe(data => {
      this.weatherPom2 = data;
    });
    this.weather.getWeatherDataByTownName(this.grad3).subscribe(data => {
      this.weatherPom3 = data;
    });


    this.http.get<any>('http://localhost:8080/posjete/muzej/' + this.muzej.idMuzej).toPromise().then(data => {
      console.log(" posjete " + data);
      this.posjete = data;
      console.log(this.posjete);
      //this.muzeji = data;
      //console.log("Procitano " + this.muzeji.length);
    });

  }

}

