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
import { VirtuelnaPosjetaService } from '../services/virtuelna-posjeta.service';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit{
  public form: FormGroup = new FormGroup({}); //forma
  

  constructor(public formBuilder: FormBuilder, //formBuilder sluzi za kreiranje forme
    private service: VirtuelnaPosjetaService, //service koristimo za cuvanje podataka
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<VideoUploadComponent>, private http: HttpClient,
    private tipService: TipService) {

  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      link: [null, Validators.required]
    });


  }

  save( value:any) {
    console.log(value);
    this.snackBar.open("Podaci su sacuvani", value.value.link, { //i prikazemo poruku koja nestaje nakon 2s
      duration: 2000,
    });
    
    this.close(value.value.link);
    return value.value.link;
    

  }

  close(el:any) {
    this.dialogRef.close({ data: el });
  }
}

