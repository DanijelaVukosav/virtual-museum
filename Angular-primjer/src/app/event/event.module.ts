import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventContainerComponent } from './event-container/event-container.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VijestiListComponent } from './vijesti-list/vijesti-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { HomeModule } from '../home/home.module';
import { HeaderComponent } from '../home/header/header.component';
import { HomeComponent } from '../home/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VirtuelnakartaComponent } from './virtuelnakarta/virtuelnakarta.component';
import { AnalitikaComponent } from './analitika/analitika.component';
import { MapaComponent } from './mapa/mapa.component';
import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [EventListComponent, EventContainerComponent, EventEditComponent, VijestiListComponent, EventDetailsComponent, VirtuelnakartaComponent, AnalitikaComponent, MapaComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    HomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAY3ixc_HdinvVonmQp0NMYdqRHCMnfWbk'
    })
    
  ],
  entryComponents: [
    EventEditComponent, HomeComponent, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ]
})
export class EventModule { }
