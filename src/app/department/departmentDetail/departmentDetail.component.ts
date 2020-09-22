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
          console.log('Request Successful, Department Details Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! Department Details Have Been Loaded!';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Department details not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Fail! Department Details Have Not Been Loaded';
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
          this.toastOptions.msg = 'Success! Department Has Been Updated';
          this.toastService.success(this.toastOptions);
        },
        error => {
          this.toastOptions.msg = 'Fail! Department Has Not Been Updated';
          this.toastService.error(this.toastOptions);
        }));
      } else {
        this.entite = Object.assign({}, this.form.value);
        this.subscriptions.push(
        this.service.create(this.entite).subscribe(res => {
          this.toastOptions.msg = 'Success! A New Department Has Been Created';
          this.toastService.success(this.toastOptions);
          this.router.navigate(['department']);
        },
        error => {
          this.toastOptions.msg = 'Fail! Department Has Not Been Created. No New Department Created!' + ' ' + error.statusText;
          this.toastService.error(this.toastOptions);
          console.log('Error when creating Department');
        }));
      }
    }

    ngOnDestroy() {
      this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
    }
  }

