import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './auth/services/guard.service';
import { AnalitikaComponent } from './event/analitika/analitika.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { VirtuelnakartaComponent } from './event/virtuelnakarta/virtuelnakarta.component';
import { PosjeteKorisnikaComponent } from './posjete/posjete-korisnika/posjete-korisnika.component';
import { PrezentacijaComponent } from './posjete/prezentacija/prezentacija.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'posjete',
    //component: PosjeteKorisnikaComponent
    loadChildren: () => import('./posjete/posjete.module').then(mod => mod.PosjeteModule),
    canActivate: [GuardService]
  },
  {
    path: 'prezentacija/:id',
    component: PrezentacijaComponent,
    canActivate: [GuardService]
    //loadChildren: () => import('./posjete/posjete.module').then(mod => mod.PosjeteModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'muzeji',
    loadChildren: () => import('./event/event.module').then(mod => mod.EventModule),
    canActivate: [GuardService]
  },
  {
    path: 'analitika',
    component: AnalitikaComponent,
    canActivate: [GuardService]
  }, 
  {
    path: 'korisnik/:id',
    component: EventDetailsComponent,
    canActivate: [GuardService]
  },
  
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
