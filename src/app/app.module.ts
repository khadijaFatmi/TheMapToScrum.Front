import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { UserStoryService} from './services/userStory.service';
import { UserStoryListComponent } from './userStory/userStoryListe/userStoryList.component';
import { UserStoryDetailComponent } from './userStory/userStoryDetail/userStoryDetail.component';

import { ProjectService } from './services/project.service';
import { ProjectListComponent } from './project/projectList/projectList.component';
import { ProjectDetailComponent } from './project/projectDetail/projectDetail.component';

import { TeamService } from './services/team.service';
import { TeamListComponent } from './team/teamList/teamList.component';
import { TeamDetailComponent } from './team/teamDetail/teamDetail.component';

import { ScrumMasterService } from './services/scrumMaster.service';
import { ScrumMasterListComponent } from './scrumMaster/scrumMasterList/scrumMasterList.component';
import { ScrumMasterDetailComponent } from './scrumMaster/scrumMasterDetail/scrumMasterDetail.component';

import { ProductOwnerService } from './services/productOwner.service';
import { ProductOwnerListComponent } from './productOwner/productOwnerList/productOwnerList.component';
import { ProductOwnerDetailComponent } from './productOwner/productOwnerDetail/productOwnerDetail.component';

import { DeveloperService } from './services/developer.service';
import { DeveloperListComponent } from './developer/developerList/developerList.component';
import { DeveloperDetailComponent } from './developer/developerDetail/developerDetail.component';

import { DepartmentService} from './services/department.service' ;
import { DepartmentListComponent } from './department/departmentList/departmentList.component';
import { DepartmentDetailComponent } from './department/departmentDetail/departmentDetail.component';

import { OuinonPipe } from './pipes/ouinon.pipe';

import { HomeComponent } from './home/home/home.component';

import { AboutComponent } from './about/about/about.component';
import { ContactComponent } from './contact/contact.component';

import { ManifestoComponent } from './manifesto/manifesto/manifesto.component';
import { GaleryComponent } from './galery/galery.component';
import { MamaBearComponent } from './mamaBear/mamaBear.component';
import { ToolsComponent } from './tools/tools.component';
import { LexicComponent } from './lexic/lexic.component';
import { ScrumdefinitionComponent } from './scrumdefinition/scrumdefinition.component';

import { SprintBacklogComponent } from './sprintBacklog/sprintBacklog.component';
import { ProductBacklogComponent } from './productBacklog/productBacklog.component';
import { SprintPlanningComponent } from './sprintPlanning/sprintPlanning.component';


import { TaskFeaturesComponent } from './taskFeatures/taskFeatures.component';


// declaration des composants
@NgModule({
  declarations: [
    AppComponent
    , ProjectListComponent
    , ProjectDetailComponent
    , TeamListComponent
    , TeamDetailComponent
    , ScrumMasterListComponent
    , ScrumMasterDetailComponent
    , ProductOwnerListComponent
    , ProductOwnerDetailComponent
    , DeveloperListComponent
    , DeveloperDetailComponent
    , DepartmentListComponent
    , DepartmentDetailComponent
    , OuinonPipe
    , HomeComponent
    , AboutComponent
    , ManifestoComponent
    , GaleryComponent
    , MamaBearComponent
    , ToolsComponent
    , ContactComponent, LexicComponent
    , UserStoryListComponent
    , UserStoryDetailComponent
    , ScrumdefinitionComponent
    , SprintBacklogComponent
    , ProductBacklogComponent
    , TaskFeaturesComponent
  ],
  // modules necessaires à l'execution du prg
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    , HttpClientModule
    , MaterialModule
    , ReactiveFormsModule
    , FormsModule
    ,  MatCarouselModule.forRoot(),
      ],
  // declaration des services utilises dans l'app et declares ici
  providers: [
    ProjectService
    , TeamService
    , ScrumMasterService
    , ProductOwnerService
    , DeveloperService
    , DepartmentService
    , UserStoryService
  ],
  // demarrage de l'application dans appComponent
  bootstrap: [AppComponent]
})
export class AppModule { }
