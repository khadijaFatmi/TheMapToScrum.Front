import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Project } from 'src/app/models/project.model';
import { UserStory } from 'src/app/models/userstory.model';
import { ProjectService } from '../../services/project.service';
import { UserStoryService } from '../../services/userStory.service';
import { Department } from 'src/app/models/department.model';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { DepartmentService } from 'src/app/services/department.service';

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

  constructor(private service: ProjectService, private fb: FormBuilder, private uss: UserStoryService,
              private teamService: TeamService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.loadDepartments();
    this.loadTeams();
    this.id = Number(window.localStorage.getItem('projectId'));
    this.form = this.fb.group({
     id: [''],
     label: ['', Validators.required],
     technicalManagerId: ['', Validators.required],
     businessManagerId: ['', Validators.required],
     teamId: [''],
     departmentId: ['', Validators.required],
     dateCreation: [''],
     dateModification: [''],
     isDeleted: ['']
   });
    if (this.id !== null) {
     this.service.getById(this.id).
     subscribe(data => {
       this.entite = data;
       this.updateform();
     },
     error => {
       console.log('erreur lecture :-/');
     });
     this.uss.liste().
     subscribe(data => {
       this.userstories = data;
       });
     }
   }

  updateform(): void {
    this.form.patchValue({
      id: this.entite.id
      , label: this.entite.label
      , technicalManagerId: this.entite.technicalManagerId
      , businessManagerId: this.entite.businessManagerId
      , teamId: this.entite.teamId
      , departmentId: this.entite.departmentId
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
  }


  onSubmit(): void {

    if (this.id !== null) {
      // this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.entite = Object.assign({}, this.form.value);
      this.service.update(this.entite).subscribe(res => {
        alert('update success');
      },
      err => {
        console.log('error');
      });
    } else {
      // this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
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

}
