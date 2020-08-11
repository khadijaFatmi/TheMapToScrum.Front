import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BusinessManager } from '../../models/businessManager.model';
import { BusinessManagerService } from '../../services/businessManager.service';

@Component({
  selector: 'app-businessmanagerdetail',
  templateUrl: './businessManagerDetail.component.html',
  styleUrls: ['./businessManagerDetail.component.css']
})
export class BusinessManagerDetailComponent implements OnInit {


  public form: FormGroup;
  private id: number;
  public entite: BusinessManager;
  public technicalManager: BusinessManager[];


  constructor(private service: BusinessManagerService
    ,         private fb: FormBuilder) { }


  ngOnInit() {
    this.id = Number(window.localStorage.getItem('bizMgrId'));
    this.form = this.fb.group({
     id: [''],
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],
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
}


