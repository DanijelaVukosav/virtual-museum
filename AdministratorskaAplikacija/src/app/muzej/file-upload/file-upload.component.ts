import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayType } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {//implements OnInit 
  link: string = "";
  imaLiVideo: boolean = false;
  idPosjeta: any;
  filenames: any = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private fileService: FileUploadService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route.params.subscribe(paramsId => {
      this.idPosjeta = paramsId.id;
      console.log(this.idPosjeta);
    });
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
    this.fileService.upload(formData,this.idPosjeta).subscribe(
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
  onDeleteFile(filename: string): void {
    this.fileService.delete(filename).subscribe(
      (event: any) => {
        this.filenames.forEach((element:any, index:number) => {
          if (element == filename) {
            delete this.filenames[index];
            console.log(this.filenames?.lenght);
          }
        });
        //console.log(event?);
        //this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  sledeciKorak():boolean
  {
    this.fileService.sacuvajPrezentaciju(this.idPosjeta, this.filenames, this.link);
    this.router.navigate(['muzeji']);
    return true;
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
  dodajLink()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '600px';
    dialogConfig.height = '400px';

    this.dialog.open(VideoUploadComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        this.link = result.data;
        this.imaLiVideo = true;
      });
  }
 
}
