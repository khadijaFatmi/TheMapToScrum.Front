import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { ScrumMasterService } from '../../services/scrumMaster.service';
import { ScrumMaster} from '../../models/scrumMaster.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scrummaster',
  templateUrl: './scrumMasterList.component.html',
  styleUrls: ['./scrumMasterList.component.css']
})
export class ScrumMasterListComponent implements OnInit, OnDestroy {

  public scrumMaster: ScrumMaster[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'Scrum Masters List',
    showClose: true,
    timeout: 5000,
  };

  constructor(private service: ScrumMasterService
            , private router: Router
            , private toastService: ToastaService) { }

  ngOnInit() {
    this.listeEntities();
}

listeEntities(): void {
  this.isLoading = true;
  this.subscriptions.push(
    this.service.liste().
      subscribe(data => {
        this.scrumMaster = data;
        console.log('Request Successful, Scrum Masters List Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! Scrum Masters List Loaded';
        this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Scrum Masters list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Scrum Masters List';
          this.toastService.error(this.toastOptions);
      }));
}

edit(objet: ScrumMaster): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('productOwnerd');
  window.localStorage.setItem('scrumMasterId', objet.id.toString());
  this.router.navigate(['productownerdetail']);
}

delete(objet: ScrumMaster): void {
  const id = objet.id;
  this.subscriptions.push(
    this.service.delete(id).
      subscribe(data => {
        alert('Request successful,Scrum Masters deleted :-)');
      //  refresh list
        this.listeEntities();
      },
      error => {
        console.log('Request failed to delete Scrum Master :-/');
      }));
}

Add() {
  window.localStorage.removeItem('scrummasterId');
  this.router.navigate(['scrummasterdetail']);
}

 ngOnDestroy() {
   this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
 }
}

