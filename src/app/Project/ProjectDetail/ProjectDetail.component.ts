import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastaService, ToastOptions } from 'ngx-toasta';


import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStory } from 'src/app/models/userstory.model';
import { UserStoryService } from '../../services/userStory.service';
import { TaskFeature } from '../../models/taskfeature.model';
import { TaskFeatureService } from '../../services/taskFeature.service';
import { TaskFeatureDetailComponent } from 'src/app/taskFeature/taskFeatureDetail/taskFeatureDetail.component';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { ScrumMaster } from 'src/app/models/scrumMaster.model';
import { ScrumMasterService } from 'src/app/services/scrumMaster.service';
import { ProductOwner } from 'src/app/models/productOwner.model';
import { ProductOwnerService } from 'src/app/services/productOwner.service';
import { Subscription } from 'rxjs';
import { Developer } from 'src/app/models/developer.model';
import { DeveloperService } from '../../services/developer.service';


@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectDetail.component.html',
  styleUrls: ['./projectDetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private id: number;
  public entite: Project;
  public departments: Department[];
  public teams: Team[];
  public scrumMasters: ScrumMaster[];
  public productOwners: ProductOwner[];
  public developer: Developer [];
  public projectStatuses: any[];
  public userstories: UserStory[] = [];
  public tasks: TaskFeature [];
  public nbTasks: number;
  public nbUS: number;
  public dataSourceTask: any;
  public dataSourceUs: any;
  public dataSourceDev: any;
  public UpdatedData: any;

  public isLoading = false;
  private subscriptions: Subscription [] = [];
  displayedColumnsTask: string[] = ['usLabel','taskLabel', 'taskFeature', 'risk', 'strPriority', 'developer', 'strTaskStatus', 'actions'];
  displayedColumnsUs: string[] = ['version', 'label', 'role', 'function1', 'function2', 'notes', 'storyPoints', 'strPriority', 'strUsStatus'];

  toastOptions: ToastOptions = {
    title: 'Project Details',
    showClose: true,
    timeout: 5000,
  };

  // toastUserMsg: ToastOptions = {
  //   title: 'Project Editing',
  //   showClose: true,
  //   timeout: 5000,
  // };

  constructor(private service: ProjectService
            , private fb: FormBuilder
            , private changeDetectorRefs: ChangeDetectorRef
            , private usService: UserStoryService
            , private tskService: TaskFeatureService
            , private devService: DeveloperService
            , private teamService: TeamService
            , private departmentService: DepartmentService
            , private scrumMasterService: ScrumMasterService
            , private productOwnerService: ProductOwnerService,
              private toastService: ToastaService
            , private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectStatuses = [{'id': 1, 'libelle': 'Initiate'}
                          , {'id': 2, 'libelle': 'PlanAndEstimate'}
                          , {'id': 3, 'libelle': 'Implement'}
                          , {'id': 4, 'libelle': 'ReviewAndRetrospective'}
                          , {'id': 5, 'libelle': 'Release'} ];
    this.form = this.fb.group({
      id: [''],
      label: ['', Validators.required],
      projectStatus: ['', Validators.required],
      scrumMasterId: ['', Validators.required],
      productOwnerId: ['', Validators.required],
      teamId: [''],
      departmentId: ['', Validators.required],
      nbUS:[''],
      nbTasks:[''],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']
    });

    this.loadDepartments();
    this.loadTeams();
    this.loadScrumMasters();
    this.loadProductOwners();

    if (window.localStorage.getItem('projectId') != null) {
      this.id = Number(window.localStorage.getItem('projectId'));
      this.loadUserStories(this.id);
      this.loadTasks(this.id);
    } else {
      this.id = 0;
    }

    if (this.id !== 0) {
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
          this.entite = data;
          this.updateform();
          this.isLoading = false;
          console.log('Request Successful! Project Detail loaded!:-)');
          this.toastOptions.msg = 'Success! Details of Project Loaded!';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Request Failed! Project Detail not loaded!:-/');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Project Details!';
          this.toastService.error(this.toastOptions);
      }));
    }
   }



  updateform(): void {
    this.form.patchValue({
      id: this.entite.id
      , label: this.entite.label
      , projectStatus: this.entite.projectStatus
      , scrumMasterId: this.entite.scrumMasterId
      , productOwnerId: this.entite.productOwnerId
      , teamId: this.entite.teamId
      , departmentId: this.entite.departmentId
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
  }


  onSubmit(): void {

    if (this.id !== null) {
      this.entite = Object.assign({}, this.form.value);
      this.service.update(this.entite).subscribe(res => {
        console.log('Request Successful! Project Updated!:-)');
        this.toastOptions.msg = 'Success! Project Has Been Updated!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! Project has not been Updated!:-)');
        this.toastOptions.msg = 'Fail! Project Has Not Been Updated!';
        this.toastService.error(this.toastOptions);
      });
    } else {
      this.entite = Object.assign({}, this.form.value);
      this.service.create(this.entite).subscribe(res => {
        console.log('Request Successful! Project Created!:-)');
        this.toastOptions.msg = 'Success! A New Project Has Been Created!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Fail! Project has not been Created!:-)');
        this.toastOptions.msg = 'Fail! Project Has Not Been Created! No New Project Created!';
        this.toastService.error(this.toastOptions);
      });
    }
  }

  loadUserStories(id: number) : void {
    this.subscriptions.push(
      this.usService.listeByProjectId(id).
      subscribe(data => {
        this.userstories = data;
        this.dataSourceUs = this.userstories;
        this.nbUS = this.dataSourceUs.length;
      }));
  }
  loadTasks(id: number): void {
    this.subscriptions.push(
      this.tskService.listeByProjectId(id).
      subscribe(data => {
        this.tasks = data;
        this.dataSourceTask = this.tasks;
        this.nbTasks = data.length;
      }));
  }

  loadDeveloper() : void {
    this.subscriptions.push(
      this.devService.liste().
      subscribe(data => {
        this.developer = data;
        this.dataSourceDev = this.developer;
      }));
  }

  loadDepartments(): void {
    this.subscriptions.push(
      this.departmentService.liste().
        subscribe(data => {
        this.departments = data;
    }));

  }

  loadTeams(): void {
    this.subscriptions.push(
      this.teamService.liste().
      subscribe(data => {
        this.teams = data;
    }));
  }


 loadScrumMasters(): void {
    this.subscriptions.push(
      this.scrumMasterService.liste().
      subscribe(data => {
        this.scrumMasters = data;
    }));
  }

  loadProductOwners(): void {
    this.subscriptions.push(
      this.productOwnerService.liste().
      subscribe(data => {
        this.productOwners = data;
        console.log('PO loaded');
    }));
  }


  editTask(id, row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.height = '80%';
    console.log('envoi', this.entite);
    dialogConfig.data = {'id': id, 'project': this.entite, 'task': row, 'usLabel': row.usLabel} ;//, 'userStory': this.userstories};
    const dialogRef = this.dialog.open(TaskFeatureDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        switch (data.id) {
          case id: {
            const indice = this.findIndexofEntity(data.id);
            this.tasks[indice] = data;
            // this.updateTaskTableEntities();
            console.log('data.uslabel' + data.usLabel);
            console.log('devId ' + data.developer.fullName);
            console.log('priority ' + data.strPriority);
            console.log('status ' + data.strTaskStatus);

            this.dataSourceTask = new MatTableDataSource();
            this.dataSourceTask.data = (this.tasks);
            break;
          }
          case 0: {
             break;
          }
          default: {
            this.dataSourceTask.data.push(data);
            this.dataSourceTask.filter = '';
            break;
          }
        }
      }
    );
  }

  updateTaskTableEntities() {

    this.dataSourceTask.data = this.tasks;
    this.changeDetectorRefs.detectChanges();
  }

  addTask() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.height = '80%';
    console.log('envoi', this.entite);
    dialogConfig.data = {'task': null, 'project': this.entite} ;
    const dialogRef = this.dialog.open(TaskFeatureDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        switch (data.id) {

          case 0: {
             break;
          }
          default: {
            this.dataSourceTask.push(data);
            this.dataSourceTask.filter = '';
            this.dataSourceTask = new MatTableDataSource();
            this.dataSourceTask.data = (this.tasks);
            break;
          }
        }
      }
    );
  }

  deleteTask(objet: TaskFeature): void {
    const id = objet.id;
    this.subscriptions.push(
      this.tskService.delete(id).
        subscribe(data => {
          if(data) {
          console.log('Request Successful! Task deleted');
          this.toastOptions.msg = 'Success! Task Deleted!';
          this.toastService.success(this.toastOptions);
          const indice = this.tasks.indexOf(objet);
            this.tasks.splice(indice, 1);
            this.dataSourceTask = new MatTableDataSource();
            this.dataSourceTask.data = (this.tasks);
          }
          else {
            this.toastOptions.msg = 'Fail! Task Has Not Been Deleted!';
            this.toastService.error(this.toastOptions);
          }
        },
        error => {
          console.log('Request Fail! Task has not been deleted :-)');
          this.toastOptions.msg = 'Http Error Fail! Task Has Not Been Deleted!';
          this.toastService.error(this.toastOptions);
      }));
  }


  updateTableEntities() {
    this.dataSourceTask.data = this.tasks;
  }

  findIndexofEntity(id: number): number {
    const index = this.tasks.findIndex(t => t.id === id);
    return index;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }
}
