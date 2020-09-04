import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';


// factorisation de tous les imports des modules matarial
@NgModule({
  imports: [
    BrowserModule
    , BrowserAnimationsModule
    , CommonModule
    , Material.MatButtonModule
    , Material.MatCardModule
    , Material.MatDatepickerModule
    , Material.MatDialogModule
    , Material.MatFormFieldModule
    , Material.MatIconModule
    , Material.MatInputModule
    , Material.MatNativeDateModule
    , Material.MatListModule
    , Material.MatMenuModule
    , Material.MatPaginatorModule
    , Material.MatProgressBarModule
    , Material.MatRadioModule
    , Material.MatSelectModule
    , Material.MatSidenavModule
    , Material.MatSortModule
    , Material.MatProgressSpinnerModule
    , Material.MatStepperModule
    , Material.MatTableModule
    , Material.MatTabsModule
    , Material.MatToolbarModule
  ],
  exports: [
    BrowserModule
    , BrowserAnimationsModule
    , CommonModule
    , Material.MatButtonModule
    , Material.MatCardModule
    , Material.MatDatepickerModule
    , Material.MatDialogModule
    , Material.MatFormFieldModule
    , Material.MatIconModule
    , Material.MatInputModule
    , Material.MatMenuModule
    , Material.MatNativeDateModule
    , Material.MatListModule
    , Material.MatPaginatorModule
    , Material.MatProgressBarModule
    , Material.MatRadioModule
    , Material.MatSelectModule
    , Material.MatSidenavModule
    , Material.MatSortModule
    , Material.MatProgressSpinnerModule
    , Material.MatStepperModule
    , Material.MatTableModule
    , Material.MatTabsModule
    , Material.MatToolbarModule
  ],
  declarations: [],
  providers: [
    Material.MatDatepickerModule
    , { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
})
export class MaterialModule { }
