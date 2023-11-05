import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {  NewsRss } from 'src/app/model/vijest.model';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-vijesti-list',
  templateUrl: './vijesti-list.component.html',
  styleUrls: ['./vijesti-list.component.css']
})
export class VijestiListComponent implements OnInit {

  RssData: any ;
  constructor(private http: HttpClient) { 
    
    this.RssData = this.GetRssFeedData();
   }
  ngOnInit(): void {
   this.GetRssFeedData();
    
     
    
  }
  GetRssFeedData() :any{
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    };
    const _url = "https://www.huffpost.com/section/arts/feed";
    //console.log("ISPISIII");
    this.http
      .get<any>(
        _url,
        requestOptions
      )
      .subscribe((data) => {
       // console.log(data);
        //console.log("PROCITAO PODATKE");
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
         // console.log(data);
          return this.RssData=result;
        });
      });

    
  }
  getDataDiff(endDate: string | number | Date) {
    let setDate = new Date(endDate).toISOString();
    var diff = (new Date()).getTime() - new Date(setDate).getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    let dayString = days == 0 ? "" : days + "days ";
    let hoursString = hours == 0 ? "" : hours + "hr ";
    let minutesString = minutes == 0 ? "" : minutes + "m ";
    return dayString + hoursString + minutesString;
  }
}
