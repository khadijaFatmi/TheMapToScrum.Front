import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { Subscription } from 'rxjs';

import { ScrumMaster } from '../../models/scrumMaster.model';
import { ScrumMasterService } from '../../services/scrumMaster.service';

@Component({
  selector: 'app-scrummasterdetail',
  templateUrl: './scrummasterDetail.component.html',
  styleUrls: ['./scrummasterDetail.component.css']
})
export class ScrumMasterDetailComponent implements OnInit, OnDestroy {


  public form: FormGroup;
  private id: number;
  public entite: ScrumMaster;
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'Scrum Master Details',
    showClose: true,
    timeout: 5000,
  };

  constructor(private service: ScrumMasterService
            , private fb: FormBuilder
            , private router: Router
            , private toastService: ToastaService) { }


  ngOnInit() {

    this.isLoading = true;
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
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
          this.entite = data;
          this.updateform();
          console.log('Request Successful, Scrum Master Details Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! Scrum Master Details Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Scrum Master Details not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Scrum Master Details';
          this.toastService.error(this.toastOptions);
    }));
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
        this.router.navigate(['scrummaster']);
      },
      err => {
        console.log('error');
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }
}


