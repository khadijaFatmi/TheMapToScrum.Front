import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ScrumMaster } from '../../models/scrumMaster.model';
import { ScrumMasterService } from '../../services/scrumMaster.service';

@Component({
  selector: 'app-scrummasterdetail',
  templateUrl: './scrummasterDetail.component.html',
  styleUrls: ['./scrummasterDetail.component.css']
})
export class ScrumMasterDetailComponent implements OnInit {


  public form: FormGroup;
  private id: number;
  public entite: ScrumMaster;

  constructor(private service: ScrumMasterService
    ,         private fb: FormBuilder, private router: Router) { }


  ngOnInit() {

    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateCreation: [''],
      dateModification: [''],
     isDeleted: ['']
     });
    if (window.localStorage.getItem('scrummasterId') != null) {
      this.id = Number(window.localStorage.getItem('scrummasterId'));
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
       console.log('erreur lecture ScrumMaster');
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

    if (this.id !== 0) {
      console.log('SMid not null');
      this.entite = Object.assign({}, this.form.value);
      this.service.update(this.entite).subscribe(res => {
        alert('Scrum Master updated');
      },
      err => {
        console.log('error');
      });
    } else {
      this.entite = Object.assign({}, this.form.value);
      this.service.create(this.entite).subscribe(res => {
        alert('a new Scrum Master created');
        this.router.navigate(['technicalmanager']);
      },
      err => {
        console.log('error');
      });
    }
  }
}


