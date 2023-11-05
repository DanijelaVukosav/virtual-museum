import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventContainerComponent } from './event-container/event-container.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { VirtuelnakartaComponent } from './virtuelnakarta/virtuelnakarta.component';


const routes: Routes = [{
  path: '',
  component: EventContainerComponent,
  children: [
    {
      path: '',
      component: EventListComponent
    },
    {
      path: 'karta/:id',
      component: VirtuelnakartaComponent
    },
    {
      path: 'muzej/:id',
      component: EventDetailsComponent
    }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
