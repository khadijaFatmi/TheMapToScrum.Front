import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userStory.model';
// import { TaskFeatureListComponent } from 'src/app/taskFeature/taskFeatureList/taskFeatureList.component';



@Component({
  selector: 'app-userstory',
  templateUrl: './userStoryList.component.html',
  styleUrls: ['./userStoryList.component.css']
})
export class UserStoryListComponent implements OnInit, OnDestroy {
  public userstory: UserStory[];
  public isLoading = false;
  private subscriptions: Subscription[] = [];

  // 1ere version de la liste, trop de champs inutiles pour l'utilisateur,seront visible
  // dans détail
  // displayedColumns: string[] = ['version', 'projet', 'name', 'role', 'function1',
  // 'function2', 'notes', 'priority', 'storyPoints', 'epicStory', 'action'];

  displayedColumns: string[] = ['version', 'project', 'title', 'role', 'priority', 'storyPoints', 'epicStory', 'status', 'tasks', 'action'];
  public dataSource: any;

  toastOptions: ToastOptions = {
    title: 'User Stories List',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: UserStoryService
            , private router: Router
            , private toastService: ToastaService) {
  }

  ngOnInit() {
    this.loadListEntities();
  }

  loadListEntities(): void {
      this.isLoading = true;
      this.subscriptions.push(
        this.service.liste().
        subscribe(data => {
          this.userstory = data;
          this.dataSource = this.userstory;
          // console.log('Request Success! User Stories List Has Been Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! User Stories List Has Been Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          // console.log('Request Fail! US list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load User Stories List' + ' ' + error.textStatus;
          this.toastService.error(this.toastOptions);
        }));

  }

  edit(objet: UserStory): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('userstoryid');
    window.localStorage.setItem('userstoryid', objet.id.toString());
    this.router.navigate(['userstorydetail']);
  }

  delete(objet: UserStory): void {
    const id = objet.id;
    this.subscriptions.push(
    this.service.delete(id).
      subscribe(data => {
        console.log('Request Success! User Story deleted!');
        this.toastOptions.msg = 'Success! User Story Has Been Deleted';
        this.toastService.success(this.toastOptions);
        // refresh US list after deleting
        this.loadListEntities();
      },
      error => {
        console.log('Request Fail! US not deleted!');
        this.toastOptions.msg = 'Fail! User Story Has Not Been Deleted';
        this.toastService.error(this.toastOptions);
      }));
  }

  Add() {
    window.localStorage.removeItem('userstoryid');
    this.router.navigate(['userstorydetail']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
