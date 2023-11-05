import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MuzejServiceService } from '../services/muzej-service.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  idMuzej: any;
  muzej: any;
  latitude :any;
  longitude :any;

  constructor(private route:ActivatedRoute,private http:HttpClient,private service:MuzejServiceService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(paramsId => {
      this.idMuzej = paramsId.id;
    });
    
    this.http.get<any>('http://localhost:8080/muzeji/'+this.idMuzej).toPromise().then(data => {
      this.muzej = data;
      console.log(data);
      this.longitude = this.muzej.longitude;
      this.latitude = this.muzej.latitude;
    });
  }
  nadjiLokaciju(event:any)
  {
    console.log(" Lat: " + event.coords.lat);
    console.log(" Long: " + event.coords.lng);
    this.longitude = event.coords.lng;
    this.latitude = event.coords.lat;
  }
  sacuvajLokaciju()
  {
    this.muzej.longitude = this.longitude;
    this.muzej.latitude = this.latitude;
    this.service.editMuzej(this.muzej);
    this.router.navigate(['/muzeji']);

  }


}
