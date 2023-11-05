import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosjeteRoutingModule } from './posjete-routing.module';
import { PosjeteKorisnikaComponent } from './posjete-korisnika/posjete-korisnika.component';
import { EventModule } from '../event/event.module';
import { HttpClientModule } from '@angular/common/http';
import { EventRoutingModule } from '../event/event-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { PrezentacijaComponent } from './prezentacija/prezentacija.component';


@NgModule({
  declarations: [
    PosjeteKorisnikaComponent,
    PrezentacijaComponent
  ],
  imports: [
    CommonModule,
    PosjeteRoutingModule,
    EventModule,
    CommonModule,
    HttpClientModule,
    EventRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ]
})
export class PosjeteModule { }
