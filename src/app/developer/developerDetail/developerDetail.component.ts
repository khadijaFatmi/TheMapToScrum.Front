import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'app-developerdetail',
  templateUrl: './developerDetail.component.html',
  styleUrls: ['./developerDetail.component.css']
})
export class DeveloperDetailComponent implements OnInit {

  public form: FormGroup;
  private id: number;
  public entite: Developer;

  constructor(private service: DeveloperService
    ,         private fb: FormBuilder, private ps: DeveloperService) { }


    ngOnInit() {
      this.id = Number(window.localStorage.getItem('userstoryid'));
      this.form = this.fb.group({
       id: [''],
       lastName: ['', Validators.required],
       firstName: ['', Validators.required],
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
       }
     }

     updateform(): void {
       this.form.patchValue({
         id: this.entite.id
         , firstName: this.entite.firstName
         , lastName: this.entite.lastName
         , dateCreation: this.entite.dateCreation
         , dateModification: this.entite.dateModification
         , isDeleted: this.entite.isDeleted
       });
       console.log('valeur');
     }

    onSubmit(): void {

       if (this.id !== null) {
         this.entite = Object.assign({}, this.form.value);
         this.service.update(this.entite).subscribe(res => {
           alert('Dev updated, success');
         },
         err => {
           console.log('error');
         });
       } else {
         this.entite = Object.assign({}, this.form.value);
         this.service.create(this.entite).subscribe(res => {
           alert('Dev created, success');
         },
         err => {
           console.log('error');
         });
       }
     }


}
