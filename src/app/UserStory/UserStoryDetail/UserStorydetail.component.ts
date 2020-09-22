import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  ToastaService, ToastOptions } from 'ngx-toasta';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userstory.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userstorydetail',
  templateUrl: './userStoryDetail.component.html',
  styleUrls: ['./userStoryDetail.component.css']
})
export class UserStoryDetailComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private id: number;
  public epicStory = false;
  public entite: UserStory;
  public projects: Project[];
  public storyPointsArray: number[];
  public usStatuses: any [];
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'User Stories Details',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: UserStoryService
            , private fb: FormBuilder
            , private ps: ProjectService
            , private router: Router
            , private toastService: ToastaService) {

  }


  ngOnInit() {
    if (window.localStorage.getItem('userstoryid') != null) {
      this.id = Number(window.localStorage.getItem('userstoryid'));
    } else {
      this.id = 0;
    }

    this.usStatuses = [
                      {'id': 1, 'libelle': 'New'}
                    , {'id': 2, 'libelle': 'InProgress'}
                    , {'id': 3, 'libelle': 'Completed'}
                    , {'id': 4, 'libelle': 'Accepted'}
                    , {'id': 5, 'libelle': 'Pending'}
                    , {'id': 6, 'libelle': 'InEvaluation'}
                    , {'id': 7, 'libelle': 'Rejected'}
                    , {'id': 8, 'libelle': 'Blocked'}
                    , {'id': 9, 'libelle': 'InVerification'}];
    this.storyPointsArray = [1, 2, 3, 5, 8, 11];
    this.loadProjects();
    this.form = this.fb.group({
    id: [''],
    projectId: ['', Validators.required],
    label: ['', Validators.required],
    version: [''],
    role: ['', Validators.required],
    function1: ['', Validators.required],
    function2: ['', Validators.required],
    notes: ['', Validators.required],
    priority: ['', Validators.required],
    storyPoints: ['', Validators.required],
    usStatus: ['', Validators.required],
    epicStory: ['', Validators.required],
    dateCreation: [''],
    dateModification: [''],
    isDeleted: ['']
  });
    if (this.id !== 0) {
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
        this.entite = data;
        this.updateform();
      },
      error => {
        console.log('Failed to read this us detail :-/');
    }));

    }
  }

  loadProjects(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.ps.liste().
      subscribe(data => {
        this.projects = data;
        console.log('Request Success!User Stories Details Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! User Stories Details loaded!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! US details not loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Failed to Load User Stories Details';
        this.toastService.error(this.toastOptions);
      }
    ));
  }

  updateform(): void {
    this.form.patchValue({
      id: this.entite.id
      , projectId: this.entite.projectId
      , label: this.entite.label
      , version: this.entite.version
      , role: this.entite.role
      , function1: this.entite.function1
      , function2: this.entite.function2
      , notes: this.entite.notes
      , priority: this.entite.priority
      , storyPoints: this.entite.storyPoints
      , usStatus: this.entite.usStatus
      , epicStory: this.entite.epicStory
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
    console.log('valeur projectid=' + this.entite.projectId);
    this.epicStory = this.entite.epicStory;
  }


  onSubmit(): void {
    // console.log('envoi ' + this.entite.epicStory);
    if (this.id !== 0) {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.update(this.entite).subscribe(res => {
        alert('update success');
        this.router.navigate(['/userstory']);
      },
      err => {
        console.log('error');
      });
    } else {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.create(this.entite).subscribe(res => {
        alert('create success');
        this.router.navigate(['/userstory']);
      },
      err => {
        console.log('error');
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
