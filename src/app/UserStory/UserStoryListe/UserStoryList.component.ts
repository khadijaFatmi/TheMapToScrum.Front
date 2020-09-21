import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userStory.model';
import { Subscription } from 'rxjs';


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

  displayedColumns: string[] = ['version', 'project', 'title', 'role', 'priority', 'storyPoints', 'epicStory', 'status', 'action'];
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
    this.loadListUS();
  }

  loadListUS(): void {
      this.isLoading = true;
      this.subscriptions.push(
        this.service.liste().
        subscribe(data => {
          this.userstory = data;
          this.dataSource = this.userstory;
          console.log('Request Success! User Stories List Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! User Stories List Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Request Fail! US list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load User Stories List';
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
        console.log('US deleted with success:' + ' ' + id);
        alert('US deleted, success');
        // refresh US list after deleting
        this.loadListUS();
      },
      error => {
        console.log('Fail to delete US!');
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
