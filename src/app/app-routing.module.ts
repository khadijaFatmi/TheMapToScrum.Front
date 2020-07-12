import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetUSListeComponent } from './ProjetUS/ProjetUSListe.component';
import { UserStoryComponent } from './UserStory/UserStoryListe/UserStory.component';
import { UserStoryDetailComponent } from './UserStory/UserStoryDetail/UserStorydetail.component';

const routes: Routes = [
  {path: 'projet', component : ProjetUSListeComponent},
  {path: 'userstory', component : UserStoryComponent },
  {path: 'userstorydetail/:id', component : UserStoryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
