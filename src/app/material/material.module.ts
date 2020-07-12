import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule(
  {
    imports: [
      BrowserModule
      , BrowserAnimationsModule
      , CommonModule
      , Material.MatButtonModule
      , Material.MatPaginatorModule
      , Material.MatTableModule

    ],
    exports: [
      BrowserModule
      , BrowserAnimationsModule
      , CommonModule
      , Material.MatButtonModule
      , Material.MatPaginatorModule
      , Material.MatTableModule
    ],
    declarations: [],
    providers: [
      Material.MatDatepickerModule,
      {
        provide: MAT_DATE_LOCALE, useValue: 'fr-FR'
      },
    ],
  })

export class MaterialModule {}
