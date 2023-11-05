import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorisniciListComponent } from './korisnici-list/korisnici-list.component';
import { PristupAdministratorimaComponent } from './pristup-administratorima/pristup-administratorima.component';

const routes: Routes = [{
  path:'',
  component: KorisniciListComponent,
  children:
    [
      {
        path: '',
        component: KorisniciListComponent
      },
      {
        path:'administratori',
        component: PristupAdministratorimaComponent
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KorisniciRoutingModule { }
