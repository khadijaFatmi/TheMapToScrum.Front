import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userstory.model';
import { Subscription } from 'rxjs';
import { TaskFeature } from 'src/app/models/taskfeature.model';
import { TaskFeatureService } from 'src/app/services/taskFeature.service';
import { ViewEncapsulation } from '@angular/core';

import { TaskFeatureDetailComponent } from 'src/app/taskFeature/taskFeatureDetail/taskFeatureDetail.component';

import { Developer } from 'src/app/models/developer.model';


@Component({
  selector: 'app-userstorydetail',
  templateUrl: './userStoryDetail.component.html',
  styleUrls: ['./userStoryDetail.component.css'],
  encapsulation: ViewEncapsulation.None
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
  public taskFeatures: TaskFeature[];
  public nbTasks: number;
  public usPriorities: any [];
  displayedColumns: string[] = ['number', 'project', 'userstory', 'priority', 'estimatedDuration', 'taskStatus', 'developer', 'dept', 'action'];
  public dataSource: any;
  projectId: number;
  projet: Project;
  developer: Developer;

  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'User Stories Details',
    showClose: true,
    timeout: 5000,
  };

  // toastUserMsg: ToastOptions = {
  //   title: 'User Stories Edit',
  //   showClose: true,
  //   timeout: 5000,
  // };




  constructor(private service: UserStoryService
            , private fb: FormBuilder
            , private ps: ProjectService
            , private router: Router
            , private serviceTask: TaskFeatureService
            , private toastService: ToastaService
            , private dialog: MatDialog, private dialogService: DialogService) {

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

    this.usPriorities = [
                      {'id': 1, 'libelle': 'Must Have'}
                    , {'id': 2, 'libelle': 'Should Have'}
                    , {'id': 3, 'libelle': 'Could Have'}
                    , {'id': 4, 'libelle': 'Wont Have'}];

    this.storyPointsArray = [1, 2, 3, 5, 8, 11];

    this.loadProjects();
    this.loadTaskEntities(this.id);
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
    usStatus: [''],
    epicStory: ['', Validators.required],
    dateCreation: [''],
    dateModification: [''],
    isDeleted: [''],
    nbTasks: [''],
  });
    if (this.id !== 0) {
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
        this.entite = data;
        this.projectId = this.entite.projectId;
        this.projet = this.entite.project;

        this.updateform();
        console.log('Request Success!User Story Details Loaded!');
        this.toastOptions.msg = 'Success! User Story Details Has Been Loaded!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! US details not loaded!');
        this.toastOptions.msg = 'Failed to Load User Story Details';
        this.toastService.error(this.toastOptions);
    }));

    }
  }



  loadTaskEntities(id: number): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.serviceTask.listeByUsId(id).
      subscribe(data => {
        this.taskFeatures = data;

        this.dataSource = this.taskFeatures;
        console.log('Request Success! Tasks List Has Been Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! Tasks List Has Been Loaded';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! Tasks list not loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Failed to Load Tasks List';
        this.toastService.error(this.toastOptions);
      }));

}

  loadProjects(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.ps.liste().
      subscribe(data => {
        this.projects = data;
        console.log('Request Success!User Story Details Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! User Story Details loaded!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! US details not loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Failed to Load User Story Details';
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
      , nbTasks: this.entite.nbTasks
      , taskPriority: this.entite.taskPriority
    });
    console.log('valeur projectid=' + this.entite.projectId);
    this.epicStory = this.entite.epicStory;
  }


  onSubmit(): void {
    // console.log('envoi ' + this.entite.epicStory);
    if (this.id !== 0) {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.update(this.entite).subscribe(res => {
        console.log('Request Success! User Story Updated!');
        this.toastOptions.msg = 'Success! User Story Has Been Updated!';
        this.toastService.success(this.toastOptions);
        this.router.navigate(['/userstory']);
      },
      err => {
        console.log('Request Fail! US not updated!');
        this.toastOptions.msg = 'Failed to Update User Story';
        this.toastService.error(this.toastOptions);
      });
    } else {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.create(this.entite).subscribe(res => {
        console.log('Request Success! User Story Created!');
        this.toastOptions.msg = 'Success! A New User Story Has Been Created!';
        this.toastService.success(this.toastOptions);
        this.router.navigate(['/userstory']);
      },
      error => {
        console.log('Request Fail! US not created!');
        this.toastOptions.msg = 'Failed to Create A New User Story';
        this.toastService.error(this.toastOptions);
      });
    }
  }

  addOrEdit(index, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.height = '80%';
    console.log('envoi', this.entite);
    dialogConfig.data = {'index': index, 'id': id, 'project': this.projet, 'userStory': this.entite};
    const dialogRef = this.dialog.open(TaskFeatureDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        switch (data.id) {
          case id: {
            const indice = this.findIndexofEntity(data.id);
            this.taskFeatures[indice] = data;
            break;
          }
          case 0: {
             break;
          }
          default: {
            this.dataSource.data.push(data);
            this.dataSource.filter = '';
            break;
          }
        }
      }
    );
  }

  delete() {

  }

  updateTableEntities() {
    this.dataSource.data = this.taskFeatures;
  }

  findIndexofEntity(id: number): number {
    const index = this.taskFeatures.findIndex(t => t.id === id);
    return index;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
