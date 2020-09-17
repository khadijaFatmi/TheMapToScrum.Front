import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStory } from 'src/app/models/userstory.model';
import { UserStoryService } from '../../services/userStory.service';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

import { ScrumMaster } from 'src/app/models/scrumMaster.model';
import { ScrumMasterService } from 'src/app/services/scrumMaster.service';
import { ProductOwner } from 'src/app/models/productOwner.model';
import { ProductOwnerService } from 'src/app/services/productOwner.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectDetail.component.html',
  styleUrls: ['./projectDetail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public form: FormGroup;
  private id: number;
  public entite: Project;
  public userstories: UserStory[];
  public departments: Department[];
  public teams: Team[];
  public scrumMasters: ScrumMaster[];
  public productOwners: ProductOwner[];
  public projectStatuses: any[];

  constructor(private service: ProjectService, private fb: FormBuilder, private uss: UserStoryService,
              private teamService: TeamService, private departmentService: DepartmentService,
              private scrumMasterService: ScrumMasterService, private productOwnerService: ProductOwnerService) { }

  ngOnInit() {
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
    } else {
      this.id = 0;
    }

    if (this.id !== 0) {
     this.service.getById(this.id).
     subscribe(data => {
       this.entite = data;
       this.updateform();
     },
     error => {
       console.log('erreur lecture :-/');
     });
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
        alert('update success');
      },
      err => {
        console.log('error');
      });
    } else {
      this.entite = Object.assign({}, this.form.value);
      this.service.create(this.entite).subscribe(res => {
        alert('create success');
      },
      err => {
        console.log('error');
      });
    }
  }

  loadDepartments(): void {
    this.departmentService.liste().
    subscribe(data => {
     this.departments = data;
    });

  }

  loadTeams(): void {

      this.teamService.liste().
      subscribe(data => {
       this.teams = data;
      });
 }


 loadScrumMasters(): void {
    this.scrumMasterService.liste().
    subscribe(data => {
    this.scrumMasters = data;
    });
  }

  loadProductOwners(): void {
    this.productOwnerService.liste().
    subscribe(data => {
    this.productOwners = data;
    console.log('PO loaded');
    });
  }
}
