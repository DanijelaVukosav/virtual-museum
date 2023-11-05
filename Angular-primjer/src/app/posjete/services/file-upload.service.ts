import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VirtuelnaPrezentacija } from 'src/app/model/virtuelan_prezentacija.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // define function to upload files
  upload(formData: FormData, idPosjeta: any): Observable<HttpEvent<string[]>> {
    console.log("IDDDD POSJETE JEEE" + idPosjeta);
    return this.http.post<string[]>(`${this.server}/upload/` + idPosjeta, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  

}