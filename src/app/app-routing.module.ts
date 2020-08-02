import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './Project/ProjectList/ProjectList.component';
import { UserStoryListComponent } from './UserStory/UserStoryListe/UserStoryList.component';
import { UserStoryDetailComponent } from './UserStory/UserStoryDetail/UserStorydetail.component';
import { HomeComponent } from './home/home/home.component';
import { ManifestoComponent } from './manifesto/manifesto/manifesto.component';
import { AboutComponent } from './about/about/about.component';
import { GaleryComponent } from './/galery/galery.component';
import { ProjectdetailComponent } from './Project/ProjectDetail/ProjectDetail.component';

const routes: Routes = [
  {path: '', redirectTo : '/home' , pathMatch : 'full'},
  {path: 'home', component : HomeComponent},
  {path: 'manifesto', component : ManifestoComponent},
  {path: 'about', component : AboutComponent},
  {path: 'galery', component : GaleryComponent},
  {path: 'projet', component : ProjectListComponent},
  {path: 'projectdetail', component : ProjectdetailComponent},
  {path: 'userstory', component : UserStoryListComponent },
  {path: 'userstorydetail', component : UserStoryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
