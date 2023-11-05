import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GuardService } from './auth/services/guard.service';
import { PristupAdministratorimaComponent } from './korisnici/pristup-administratorima/pristup-administratorima.component';
import { MuzejDetailsComponent } from './muzej/muzej-details/muzej-details.component';

const routes: Routes = [
  {
    path: 'login',
    //component: LoginComponent
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    //component: LoginComponent
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [GuardService]
  },
  {
    path: 'korisnici',
   // component: LoginComponent
    loadChildren: () => import('./korisnici/korisnici.module').then(mod => mod.KorisniciModule),
    canActivate: [GuardService]
  },
  {
    path: 'korisnici/administratori',
    component: PristupAdministratorimaComponent,
    canActivate: [GuardService]
    //loadChildren: () => import('./korisnici/korisnici.module').then(mod => mod.KorisniciModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'muzeji',
    loadChildren: () => import('./muzej/muzej.module').then(mod => mod.MuzejModule),
    canActivate: [GuardService]
  },
  {
    path: 'korisnik/:id',
    component: MuzejDetailsComponent,
    canActivate: [GuardService]
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
