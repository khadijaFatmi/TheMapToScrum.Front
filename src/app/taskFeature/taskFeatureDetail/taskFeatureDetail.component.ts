import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatNativeDateModule } from '@angular/material';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStoryService } from '../../services/userStory.service';
import { DeveloperService } from '../../services/developer.service';

import { TaskFeature } from 'src/app/models/taskfeature.model';
import { TaskFeatureService } from 'src/app/services/taskFeature.service';
import { Developer } from 'src/app/models/developer.model';
import { UserStory } from 'src/app/models/userstory.model';
import { Department } from 'src/app/models/department.model';
import { SelectionModel } from '@angular/cdk/collections';
import { from } from 'rxjs/internal/observable/from';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-taskfeaturedetail',
  templateUrl: './taskFeaturedetail.component.html',
  styleUrls: ['./taskFeatureDetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFeatureDetailComponent implements OnInit, OnDestroy {

  public task: TaskFeature;
  public projects: Project[];
  public projet: Project;
  public number;
  public userStories: UserStory[];
  public developers: Developer[];
  public departments: Department[];
  public projectId = 0;
  public departmentId = 0;
  public userStoryId = 0;
  public developerId = 0;
  public projectLabel = '';
  public developerFullName = '';
  public usLabel = '';
  public priority;
  public taskStatus;
  public taskPriorities: any [] = [
    {'id': 1, 'libelle': 'Critical'}
  , {'id': 2, 'libelle': 'Important'}
  , {'id': 3, 'libelle': 'Moderate'}
  , {'id': 4, 'libelle': 'Low'}
      ];
  public taskStatuses: any [] = [
    {'id': 1, 'libelle': 'New'}
  , {'id': 2, 'libelle': 'Backlog'}
  , {'id': 3, 'libelle': 'Sprint'}
  , {'id': 4, 'libelle': 'ToDo'}
  , {'id': 5, 'libelle': 'Doing'}
  , {'id': 6, 'libelle': 'Verify'}
  , {'id': 7, 'libelle': 'Done'}
    ];

  public estimatedDurations: any [] = [0.25, 0.5, 1.0, 1.5, 1.75, 2.0];

  isLoading = true;
  submitted = false;

  toastOptions: ToastOptions = {
    title: 'Tasks',
    showClose: true,
    timeout: 5000,
  };


  private subscriptions: Subscription[] = [];
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder
            , @Inject(MAT_DIALOG_DATA) public data
            , public dialogRef: MatDialogRef<TaskFeatureDetailComponent>
            , private toastService: ToastaService
            , private service: TaskFeatureService
            , private developerService: DeveloperService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.loadDevelopers();
    this.createForm();
    if (this.data.task !== null && this.data.task.id !== null) {
      this.getEntity(this.data.id);
    }

    this.isLoading = false;
    this.projectLabel = this.data.project.label;
    this.usLabel = this.data.usLabel;
    this.form.patchValue({
    projectId: this.data.project.id,
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      number: [''],
      projectId: [''],
      userStoryId: [''],
      developerId: ['', Validators.required],
      // departmentId: [''],
      // projectLabel: [''],
      label: ['', Validators.required],
      feature: ['', Validators.required],
      estimatedDuration: [''],
      assumption: [''],
      acceptanceCriteria: [''],
      risk: [''],
      priority: [''],
      taskStatus: ['', Validators.required],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']
    });
  }


  loadDevelopers() {
    if (!this.developers) {
      this.subscriptions.push(this.developerService.liste()
        .subscribe(data => {
          this.isLoading = false;
          this.developers = data;
          this.toastOptions.msg = ('DeveloppersList.Loaded');
          this.toastService.success(this.toastOptions);
        },
        error => {
          this.isLoading = false;
          this.toastOptions.msg = ('DeveloppersList.Errors.LoadingFailed') + ' ' + error.statusText;
          this.toastService.error(this.toastOptions);
        }
      ));
    }
  }

  updateForm() {
    this.form.patchValue({
      id: this.task.id,
      projectId: this.task.projectId,
      userStoryId: this.task.userStoryId,
      developerId: this.task.developerId,

      number: this.task.number,
      label: this.task.label,
      feature: this.task.feature,
      assumption: this.task.assumption,
      risk: this.task.risk,
      acceptanceCriteria: this.task.acceptanceCriteria,
      priority: this.task.priority,
      taskStatus: this.task.taskStatus,
      estimatedDuration: this.task.estimatedDuration,
      dateCreation: this.task.dateCreation,
      dateModification: this.task.dateModification,
      isDeleted: this.task.isDeleted,
    });

  }
  get f() { return this.form.controls; }

  getEntity(id: number) {
    this.subscriptions.push(this.service.getById(id).subscribe(
      data => {
        this.task = data;
        this.projectId = data.projectId;
        this.userStoryId = data.userStoryId;
        this.number = data.number;
        this.developerId = data.developerId;
        this.updateForm();
        this.toastService.success(('TaskDetail.Loaded'));
      },
      error => {
        this.isLoading = false;
        this.toastOptions.msg = ('taskDetail.Errors.LoadingFailed') + ' ' + error.statusText;
        this.toastService.error(this.toastOptions);
      }
    ));
  }

  getDeveloperName(id: number): string {
    const selected = this.developers
    .filter(lina => lina.id === id)
    .reduce(function(str: string, developer) {
      return str + developer.fullName;
    }, '');
    return selected;
  }



  getTaskStatuses(id: number): string {
    const source = from(this.taskStatuses);
    const example = source.pipe(filter(status => status.id === id));
    console.log('source ', example);
    const selected = this.taskStatuses
    .filter(item => item.id === id)
    .reduce(function(str: string, strTaskStatus) {
      return str + strTaskStatus.libelle;
    }, '');
    return selected;
  }

   getTaskPriority(id: number): string {
     const source = from(this.taskPriorities);
     const example = source.pipe(filter(priority => priority.id === id));
     console.log('source ', example);
     const selected = this.taskPriorities
     .filter(item => item.id === id)
     .reduce(function(str: string, strPriority) {
       return str + strPriority.libelle;
     }, '');
     return selected;
   }

  onSubmit() {
    this.submitted = true;
    this.developerFullName = this.getDeveloperName(this.form.get('developerId').value);
    const developer: Developer = { fullName: this.developerFullName };
    const strPriority = this.getTaskPriority(this.form.get('priority').value);
    const strTaskStatus = this.getTaskStatuses(this.form.get('taskStatus').value);

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      this.isLoading = true;


      this.task = Object.assign({}, this.form.value);

      if (this.form.value.id  === null || this.form.value.id === '') {
        this.subscriptions.push(this.service.create(this.task).subscribe(res => {
          this.isLoading = false;
          this.toastOptions.msg = ('You have just created a new Task');
          this.toastService.success(this.toastOptions);
          res.developer = developer;
          res.strPriority = strPriority;
          res.strTaskStatus = strTaskStatus;
          res.usLabel = this.usLabel;

          this.dialogRef.close(res);
        },
        error => {
          this.isLoading = false;
          this.toastOptions.msg = ('taskDetail.Errors.CreatedFailed') + ' ' + error.statusText;
          this.toastService.error(this.toastOptions);
        }
        )
        );
      } else {
        this.subscriptions.push(this.service.update(this.task).subscribe(res => {
            this.isLoading = false;
            this.toastOptions.msg = ('You have just updated this Task');
            this.toastService.success(this.toastOptions);
            res.developer = developer;
            res.usLabel = this.usLabel;
            res.strPriority = strPriority;
            res.strTaskStatus = strTaskStatus;

            this.dialogRef.close(res);
          },
          error => {
            this.isLoading = false;
            this.toastOptions.msg = ('taskDetail.Errors.UpdatedFailed') + ' ' + error.statusText;
            this.toastService.error(this.toastOptions);
          })
        );
      }
    }
  }

  close() {
    const data = {id : 0 };
    this.dialogRef.close(data);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
