import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/event.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    url = "https://api.openweathermap.org/data/2.5/weather";
    apiKey = "b47565dc6376402c9f32f72da40b01e8";
    constructor(private http: HttpClient) { }
    getWeatherDataByTownName(name: string)
    {
        let params = new HttpParams().set('q', name).set('appid', this.apiKey);
        return this.http.get(this.url, { params });
    }
}