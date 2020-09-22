import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { Subscription } from 'rxjs';

import { Department} from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';


@Component({
  selector: 'app-departmentdetail',
  templateUrl: './departmentDetail.component.html',
  styleUrls: ['./departmentDetail.component.css']
})
export class DepartmentDetailComponent implements OnInit, OnDestroy {


    public form: FormGroup;
    private id: number;
    public entite: Department;
    public isLoading = false;
    private subscriptions: Subscription [] = [];


    toastOptions: ToastOptions = {
    title: 'Entity Departments List',
    showClose: true,
    timeout: 5000,
  };

    constructor(private service: DepartmentService
              , private fb: FormBuilder
              , private router: Router
              , private toastService: ToastaService) {
    }

    ngOnInit() {
    this.isLoading = true;
    this.id = Number(window.localStorage.getItem('departmentid'));
    this.form = this.fb.group({
      id: [''],
      label: [''],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']
    });
    if (this.id !== null) {
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
          this.entite = data;
          this.updateform();
          console.log('Request Successful, Entity Departments List Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! Entity Departments List Is Loaded!';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Entity Departments list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Entity Departments List';
          this.toastService.error(this.toastOptions);
        }));
      }
    }

    updateform(): void {
      this.form.patchValue({
        id: this.entite.id
        , label: this.entite.label
        , dateCreation: this.entite.dateCreation
        , dateModification: this.entite.dateModification
        , isDeleted: this.entite.isDeleted
      });
    }


    onSubmit(): void {
      console.log('envoi ');
      if (this.id !== 0) {
        this.entite = Object.assign({}, this.form.value);
        this.subscriptions.push(
        this.service.update(this.entite).subscribe(res => {
          this.toastOptions.msg = 'Failed to update Entity Departments List';
          this.toastService.success(this.toastOptions);
          alert('Department updated, success!');
        },
        err => {
          this.toastOptions.msg = 'Failed to update Entity Departments List';
          this.toastService.error(this.toastOptions);
          console.log('error');
        }));
      } else {
        this.entite = Object.assign({}, this.form.value);
        this.subscriptions.push(
        this.service.create(this.entite).subscribe(res => {
          this.toastOptions.msg = 'Failed to update Entity Departments List';
          this.toastService.success(this.toastOptions);
          this.router.navigate(['department']);
        },
        error => {
          this.toastOptions.msg = 'Failed to update Entity Departments List' + ' ' + error.statusText;
          this.toastService.error(this.toastOptions);
          console.log('Error when creating Department');
        }));
      }
    }

    ngOnDestroy() {
      this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
    }
  }

