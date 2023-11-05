import { Component, OnInit, Sanitizer } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayType } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VirtuelnaPrezentacija } from 'src/app/model/virtuelan_prezentacija.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-prezentacija',
  templateUrl: './prezentacija.component.html',
  styleUrls: ['./prezentacija.component.css']
})
export class PrezentacijaComponent {
  prezentacija: VirtuelnaPrezentacija=new VirtuelnaPrezentacija();
  link: string = "";
  imaLiVideo: boolean = false;
  idPosjeta: any;
  filenames: any = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  imageToShow1: any;
  isImageLoading1: boolean = true;
  imageToShow2: any;
  isImageLoading2: boolean = true;
  imageToShow3: any;
  isImageLoading3: boolean = true;
  imageToShow4: any;
  isImageLoading4: boolean = true;
  imageToShow5: any;
  isImageLoading5: boolean = true;
  imageToShow6: any;
  isImageLoading6: boolean = true;
  imageToShow7: any;
  isImageLoading7: boolean = true;
  imageToShow8: any;
  isImageLoading8: boolean = true;
  imageToShow9: any;
  isImageLoading9: boolean = true;
  imageToShow10: any;
  isImageLoading10: boolean = true;

  videoToShow: any;
  postojiVideo: boolean = false;
  videoLink: any;
  postojiLink: boolean = false;

  constructor(private san:DomSanitizer,private fileService: FileUploadService,private http:HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route.params.subscribe(paramsId => {
      this.idPosjeta = paramsId.id;
      console.log(this.idPosjeta);
    });
    console.log("KONSTRUKTORRRRRRRRRRRRRRR");

    this.http.get<any>('http://localhost:8080/prezentacije/'+this.idPosjeta).toPromise().then(data => {
      this.prezentacija = data;
      if (this.prezentacija.slika1 != null && !(this.prezentacija.slika1.endsWith('.mp4')))
      {
        this.isImageLoading1 = true;
        this.fileService.getImage('http://localhost:8080/download/'+this.prezentacija.slika1).subscribe(data => {
          this.createImageFromBlob(data);
          this.isImageLoading1 = false;
        }, error => {
          this.isImageLoading1 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.slika2 != null && !(this.prezentacija.slika2.endsWith('.mp4'))) {
        this.isImageLoading2 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika2).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow2 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading2 = false;
        }, error => {
          this.isImageLoading2 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.slika3 != null && !(this.prezentacija.slika3.endsWith('.mp4'))) {
        this.isImageLoading3 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika3).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow3 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading3 = false;
        }, error => {
          this.isImageLoading3 = false;
          console.log(error);
        });
      }

      if (this.prezentacija.slika4 != null && !(this.prezentacija.slika4.endsWith('.mp4'))) {
        this.isImageLoading4 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika4).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow4 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading4 = false;
        }, error => {
          this.isImageLoading4 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.slika5 != null && !(this.prezentacija.slika5.endsWith('.mp4'))) {
        this.isImageLoading5 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika5).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow5 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading5 = false;
        }, error => {
          this.isImageLoading5 = false;
          console.log(error);
        });
      }

      if (this.prezentacija.slika6 != null && !(this.prezentacija.slika6.endsWith('.mp4'))) {
        this.isImageLoading6 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika6).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow6 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading6 = false;
        }, error => {
          this.isImageLoading6 = false;
          console.log(error);
        });
      }

      if (this.prezentacija.slika7 != null && !(this.prezentacija.slika7.endsWith('.mp4'))) {
        this.isImageLoading7 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika7).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow7 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading7 = false;
        }, error => {
          this.isImageLoading7 = false;
          console.log(error);
        });
      }

      if (this.prezentacija.slika8 != null && !(this.prezentacija.slika8.endsWith('.mp4'))) {
        this.isImageLoading8 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika8).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow8 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading8 = false;
        }, error => {
          this.isImageLoading8 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.slika9 != null && !(this.prezentacija.slika9.endsWith('.mp4'))) {
        this.isImageLoading9 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika9).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow9 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading9 = false;
        }, error => {
          this.isImageLoading9 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.slika10 != null && !(this.prezentacija.slika10.endsWith('.mp4'))) {
        this.isImageLoading10 = true;
        this.fileService.getImage('http://localhost:8080/download/' + this.prezentacija.slika10).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.imageToShow10 = reader.result;
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
          this.isImageLoading10 = false;
        }, error => {
          this.isImageLoading10 = false;
          console.log(error);
        });
      }
      if (this.prezentacija.video?.startsWith("http"))
      {
        console.log("UDJEEE U IFFFFF");
        this.videoLink = this.prezentacija.video;
        this.videoLink = this.san.bypassSecurityTrustResourceUrl(this.prezentacija.video);
        this.postojiLink = true;
      }
      else if (this.prezentacija.video!= null && this.prezentacija.video?.endsWith('.mp4'))
      {
        this.postojiVideo = false;
        console.log("POSTJI VIDEOOOOOO");
        this.filenames[0] = this.prezentacija.video;
        
      }
      else
      {
        let videoName: string = "";
        if (this.prezentacija.slika1?.endsWith('.mp4'))
          videoName = this.prezentacija.slika1;
        else if (this.prezentacija.slika2?.endsWith('.mp4'))
          videoName = this.prezentacija.slika2;
        else if (this.prezentacija.slika3?.endsWith('.mp4'))
          videoName = this.prezentacija.slika3;
        else if (this.prezentacija.slika4?.endsWith('.mp4'))
          videoName = this.prezentacija.slika4;
        else if (this.prezentacija.slika5?.endsWith('.mp4'))
          videoName = this.prezentacija.slika5;
        else if (this.prezentacija.slika6?.endsWith('.mp4'))
          videoName = this.prezentacija.slika6;
        else if (this.prezentacija.slika7?.endsWith('.mp4'))
          videoName = this.prezentacija.slika7;
        else if (this.prezentacija.slika8?.endsWith('.mp4'))
          videoName = this.prezentacija.slika8;
        else if (this.prezentacija.slika9?.endsWith('.mp4'))
          videoName = this.prezentacija.slika9;
        else if (this.prezentacija.slika10?.endsWith('.mp4'))
          videoName = this.prezentacija.slika10;
        if (videoName != "")
        {
          //ucitaj video sa ovim imenom
          this.postojiVideo = true;
        }
      }


    });
   
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow1 = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  // define a function to upload files
  onUploadFiles(element: any): void {

    let files = element.files;

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
      if (file.name.includes('.mp4'))
        this.imaLiVideo = true;
    }
    this.fileService.upload(formData, this.idPosjeta).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    console.log("Da li ima video: " + this.imaLiVideo);
  }

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
  


}
