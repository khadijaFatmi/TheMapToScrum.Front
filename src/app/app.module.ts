import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjetUSListeComponent } from './ProjetUS/ProjetUSListe.component';
import { UserStoryComponent} from './UserStory/UserStoryListe/UserStory.component';
import { UserStoryService} from './UserStory/UserStory.service';

import { ProjetService } from './ProjetUS/ProjetUSListe.service';
import { MaterialModule } from './material/material.module';
import { UserStoryDetailComponent } from './UserStory/UserStoryDetail/UserStorydetail.component';
import { OuinonPipe } from './pipes/ouinon.pipe';

@NgModule({
  declarations: [
    AppComponent
    , ProjetUSListeComponent
    , UserStoryComponent
    , UserStoryDetailComponent,
      OuinonPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    , HttpClientModule
    , MaterialModule
    , ReactiveFormsModule
      ],
  providers: [
    ProjetService
    , UserStoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
