import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Projet } from 'src/app/models/projets.model';
import { UserStory } from 'src/app/models/userstory.model';
import { ProjetService } from '../Project.service';
import { UserStoryService } from 'src/app/UserStory/UserStory.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectdetailComponent implements OnInit {

  public form: FormGroup;
  private id: number;
  public entite: Projet;
  public userstories: UserStory[];

  constructor(private service: ProjetService, private fb: FormBuilder, private uss: UserStoryService) { }

  ngOnInit() {
    this.id = Number(window.localStorage.getItem('projetid'));
    this.form = this.fb.group({
     id: [''],
     label: ['', Validators.required],
     authorId: ['', Validators.required],
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
      , authorId: this.entite.authorId
      , departmentId: this.entite.departmentId
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
  }


  onSubmit(): void {

    if (this.id !== null) {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.update(this.entite).subscribe(res => {
        alert('update success');
      },
      err => {
        console.log('error');
      });
    } else {
      this.entite = Object.assign({}, this.form.value, this.form.get('epicStory').value);
      this.service.create(this.entite).subscribe(res => {
        alert('create success');
      },
      err => {
        console.log('error');
      });
    }
  }

}
