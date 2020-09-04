import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from '../../services/project.service';
import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userstory.model';


@Component({
  selector: 'app-userstorydetail',
  templateUrl: './userStoryDetail.component.html',
  styleUrls: ['./userStoryDetail.component.css']
})
export class UserStoryDetailComponent implements OnInit {
  public form: FormGroup;
  private id: number;
  public entite: UserStory;
  public projects: Project[];
  public storyPointsArray: number[];

  constructor(private service: UserStoryService
    ,         private fb: FormBuilder, private ps: ProjectService, private router: Router) {

  }


  ngOnInit() {
    if (window.localStorage.getItem('userstoryid') != null) {
      this.id = Number(window.localStorage.getItem('userstoryid'));
    } else {
      this.id = 0;
    }
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
    epicStory: ['', Validators.required],
    dateCreation: [''],
    dateModification: [''],
    isDeleted: ['']
  });
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

  loadProjects(): void {
    this.ps.liste().
    subscribe(data => {
      this.projects = data;
      });
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
      , epicStory: this.entite.epicStory
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
    console.log('valeur projectid=' + this.entite.projectId);
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

}
