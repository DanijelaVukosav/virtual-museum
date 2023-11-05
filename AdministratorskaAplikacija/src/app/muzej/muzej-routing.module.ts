import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuzejListComponent } from './muzej-list/muzej-list.component';
import { MuzejContainerComponent } from './muzej-container/muzej-container.component';
import { MuzejDetailsComponent } from './muzej-details/muzej-details.component';
import { MapaComponent } from './mapa/mapa.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { PosjeteListComponent } from './posjete-list/posjete-list.component';


const routes: Routes = [{
  path: '',
  component: MuzejContainerComponent,
  children: [
    {
      path: '',
      component: MuzejListComponent
    },
    {
      path: 'mapa/:id',
      component: MapaComponent
    },
    {
      path: 'video/:id',
      component: VideoUploadComponent
    },
    {
      path: 'posjeta/:id',
      component: FileUploadComponent
    },
    {
      path: 'posjete/:id',
      component: PosjeteListComponent
    },
    {
      path: 'muzej/:id',
      component: MuzejDetailsComponent
    }
    

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuzejRoutingModule { }
