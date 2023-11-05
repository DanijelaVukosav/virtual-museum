import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KorisniciRoutingModule } from './korisnici-routing.module';
import { KorisniciListComponent } from './korisnici-list/korisnici-list.component';
import { KorisniciService } from './services/korisnici.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AppMaterialModule } from '../app-material/app-material.module';
import { PristupAdministratorimaComponent } from './pristup-administratorima/pristup-administratorima.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [KorisniciListComponent, PristupAdministratorimaComponent],
  imports: [
    CommonModule,
    KorisniciRoutingModule,
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    
  ],
  entryComponents: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableDataSource
  ]
})
export class KorisniciModule { }
