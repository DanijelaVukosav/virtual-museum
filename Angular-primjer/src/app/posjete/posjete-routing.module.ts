import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosjeteKorisnikaComponent } from './posjete-korisnika/posjete-korisnika.component';
import { PrezentacijaComponent } from './prezentacija/prezentacija.component';

const routes: Routes = [
  {
    path: '',
    component: PosjeteKorisnikaComponent,
    children: [
      {
        path: '',
        component: PosjeteKorisnikaComponent
      },
      {
        path: 'prezentacija/:id',
        component: PrezentacijaComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosjeteRoutingModule { }
