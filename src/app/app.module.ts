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
import { UserStoryListComponent} from './userStory/UserStoryListe/userStoryList.component';
import { UserStoryDetailComponent } from './userStory/UserStoryDetail/userStorydetail.component';

import { ProjectService } from './services/project.service';
import { ProjectListComponent } from './project/projectList/projectList.component';
import { ProjectDetailComponent } from './project/projectDetail/projectDetail.component';

import { TeamService } from './services/team.service';
import { TeamListComponent } from './team/TeamList/teamList.component';
import { TeamDetailComponent } from './team/teamDetail/teamDetail.component';

import { TechnicalManagerService } from './services/technicalManager.service';
import { TechnicalManagerListComponent } from './technicalManager/technicalManagerList/technicalManagerList.component';
import { TechnicalManagerDetailComponent } from './technicalManager/technicalManagerDetail/technicalManagerDetail.component';

import { BusinessManagerService } from './services/businessManager.service';
import { BusinessManagerListComponent } from './businessManager/businessManagerList/businessManagerList.component';
import { BusinessManagerDetailComponent } from './businessManager/businessManagerDetail/businessManagerDetail.component';

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



@NgModule({
  declarations: [
    AppComponent
    , ProjectListComponent
    , ProjectDetailComponent
    , UserStoryListComponent
    , UserStoryDetailComponent
    , TeamListComponent
    , TeamDetailComponent
    , TechnicalManagerListComponent
    , TechnicalManagerDetailComponent
    , BusinessManagerListComponent
    , BusinessManagerDetailComponent
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
  ],
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
  providers: [
    ProjectService
    , UserStoryService
    , TeamService
    , TechnicalManagerService
    , BusinessManagerService
    , DeveloperService
    , DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
