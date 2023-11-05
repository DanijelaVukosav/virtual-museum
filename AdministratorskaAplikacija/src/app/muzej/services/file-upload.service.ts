import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VirtuelnaPrezentacija } from 'src/app/model/virtuelnaprezentacija.model';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // define function to upload files
  upload(formData: FormData, idPosjeta: any): Observable<HttpEvent<string[]>> {
    console.log("IDDDD POSJETE JEEE" + idPosjeta);
    return this.http.post<string[]>(`${this.server}/upload/`+idPosjeta, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    if (filename == "log") {
      return this.http.get(`${this.server}/export1/pdf`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      });
    }
    else {
      return this.http.get(`${this.server}/download/${filename}/`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      });
    }
  }
  delete(filename: string): any {
    return this.http.delete(`${this.server}/delete/${filename}/`);
  }
  sacuvajPrezentaciju(idPosjeta: any, filenames: string[], link: string)
  {
    let prezentacija: VirtuelnaPrezentacija = new VirtuelnaPrezentacija();
    prezentacija.idvirtuelnaposjeta = idPosjeta;
    prezentacija.slika1 = filenames[0];
    prezentacija.slika2 = filenames[1];
    prezentacija.slika3 = filenames[2];
    prezentacija.slika4= filenames[3];
    prezentacija.slika5 = filenames[4];
    prezentacija.slika6 = filenames[5];
    prezentacija.slika7 = filenames[6];
    prezentacija.slika8 = filenames[7];
    prezentacija.slika9 = filenames[8];
    prezentacija.slika10 = filenames[9];
    if (link == '')
    {
      filenames.forEach((element: any, index: number) => {
        if (element.includes('.mp4')) {
          prezentacija.video = filenames[index];
        }
      });
    }
    else
    {
      prezentacija.video = link;
    }
    console.log(prezentacija);


    return this.http.post<any>('http://localhost:8080/prezentacije', JSON.stringify(prezentacija), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
      console.log(" sacuvaa prezentacija");
      console.log(data);
      return data;
    });

  }

}