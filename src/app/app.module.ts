import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjetUSListeComponent } from './ProjetUS/ProjetUSListe.component';
import { UserStoryListComponent} from './UserStory/UserStoryListe/UserStoryList.component';
import { UserStoryService} from './UserStory/UserStory.service';

import { ProjetService } from './ProjetUS/ProjetUSListe.service';
import { MaterialModule } from './material/material.module';
import { UserStoryDetailComponent } from './UserStory/UserStoryDetail/UserStorydetail.component';
import { OuinonPipe } from './pipes/ouinon.pipe';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about/about.component';
import { ManifestoComponent } from './manifesto/manifesto/manifesto.component';
import { GaleryComponent } from './galery/galery.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    AppComponent
    , ProjetUSListeComponent
    , UserStoryListComponent
    , UserStoryDetailComponent,
      OuinonPipe,
      HomeComponent,
      AboutComponent,
      ManifestoComponent,
      GaleryComponent
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
    ProjetService
    , UserStoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
