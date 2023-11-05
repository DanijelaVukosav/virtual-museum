import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MuzejRoutingModule } from './muzej-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { MuzejContainerComponent } from './muzej-container/muzej-container.component';
import { MuzejDetailsComponent } from './muzej-details/muzej-details.component';
import { MuzejListComponent } from './muzej-list/muzej-list.component';
import { MuzejEditComponent } from './muzej-edit/muzej-edit.component';
import { MapaComponent } from './mapa/mapa.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { VirtuelnaPosjetaComponent } from './virtuelna-posjeta/virtuelna-posjeta.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { PosjeteListComponent } from './posjete-list/posjete-list.component';




@NgModule({
  declarations: [MuzejListComponent, MuzejContainerComponent, MuzejEditComponent,  MuzejDetailsComponent, MuzejContainerComponent, MuzejDetailsComponent, MuzejListComponent, MapaComponent, FileUploadComponent, VirtuelnaPosjetaComponent, VideoUploadComponent, PosjeteListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MuzejRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyATXKv27DZ13nE7ir-i-nEJDLJmfh2Fviw'
    })

  ],
  entryComponents: [
    MuzejEditComponent,  MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ]
})
export class MuzejModule { }
