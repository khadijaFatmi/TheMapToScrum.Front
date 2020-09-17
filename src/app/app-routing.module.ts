import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project/projectList/projectList.component';
import { ProjectDetailComponent } from './project/projectDetail/projectDetail.component';
import { UserStoryListComponent } from './userStory/userStoryListe/userStoryList.component';
import { UserStoryDetailComponent } from './userStory/userStoryDetail/userStoryDetail.component';

import { ScrumMasterListComponent } from './scrumMaster/scrumMasterList/scrumMasterList.component';
import { ScrumMasterDetailComponent } from './scrumMaster/scrumMasterDetail/scrumMasterDetail.component';

import { ProductOwnerListComponent} from './productOwner/productOwnerList/productOwnerList.component';
import { ProductOwnerDetailComponent } from './productOwner/productOwnerDetail/productOwnerDetail.component';

import { TeamDetailComponent } from './team/teamDetail/teamDetail.component';
import { TeamListComponent } from './team/teamList/teamList.component';

import { DeveloperListComponent } from './developer/developerList/developerList.component';
import { DeveloperDetailComponent } from './developer/developerDetail/developerDetail.component';

import { DepartmentListComponent } from './department/departmentList/departmentList.component';
import { DepartmentDetailComponent } from './department/departmentDetail/departmentDetail.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home/home.component';
import { ManifestoComponent } from './manifesto/manifesto/manifesto.component';
import { LexicComponent } from './lexic/lexic.component';
import { AboutComponent } from './about/about/about.component';
import { GaleryComponent } from './/galery/galery.component';
import { ScrumdefinitionComponent } from './scrumdefinition/scrumdefinition.component';


const routes: Routes = [
  {path: '', redirectTo : '/home' , pathMatch : 'full'},
  {path: 'home', component : HomeComponent},
  {path: 'about', component : AboutComponent},
  {path: 'manifesto', component : ManifestoComponent},
  {path: 'scrumdefinition', component : ScrumdefinitionComponent},
  {path: 'lexic', component : LexicComponent},
  {path: 'contact', component : ContactComponent},
  {path: 'galery', component : GaleryComponent},
  {path: 'project', component : ProjectListComponent},
  {path: 'projectdetail', component : ProjectDetailComponent},
  {path: 'userstory', component : UserStoryListComponent },
  {path: 'userstorydetail', component : UserStoryDetailComponent},
  {path: 'scrummaster', component : ScrumMasterListComponent},
  {path: 'scrummasterdetail', component : ScrumMasterDetailComponent},
  {path: 'productowner', component : ProductOwnerListComponent},
  {path: 'productownerdetail', component : ProductOwnerDetailComponent},
  {path: 'team', component: TeamListComponent},
  {path: 'teamdetail', component: TeamDetailComponent},
  {path: 'developer', component: DeveloperListComponent},
  {path: 'developerdetail', component: DeveloperDetailComponent},
  {path: 'department', component: DepartmentListComponent},
  {path: 'departmentDetail', component: DepartmentDetailComponent},
  {path: '**', component: HomeComponent, data: { title: 'Page non trouvée' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
