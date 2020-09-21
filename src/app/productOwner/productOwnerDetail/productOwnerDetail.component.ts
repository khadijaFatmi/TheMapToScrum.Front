import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { Subscription } from 'rxjs';

import { ProductOwner } from '../../models/productOwner.model';
import { ProductOwnerService } from '../../services/productOwner.service';

@Component({
  selector: 'app-productownerdetail',
  templateUrl: './productownerDetail.component.html',
  styleUrls: ['./productownerDetail.component.css']
})
export class ProductOwnerDetailComponent implements OnInit, OnDestroy {


  public form: FormGroup;
  private id: number;
  public entite: ProductOwner;
  public productOwner: ProductOwner[];
  public isLoading = false;
  private subscriptions: Subscription [] = [];


  toastOptions: ToastOptions = {
    title: 'Product Owner Details',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: ProductOwnerService
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
    if (window.localStorage.getItem('productownerId') != null) {
      this.id = Number(window.localStorage.getItem('productownerId'));
      console.log('mode update');
    } else {
      this.id = 0;
      console.log('mode create');
    }
    if (this.id !== 0) {
      this.subscriptions.push(
        this.service.getById(this.id).
        subscribe(data => {
          this.entite = data;
          this.updateform();
          console.log('Request Successful, Product Owners Details Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! Product Owners Details Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Product Owners details not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Product Owners details';
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
      this.entite = Object.assign({}, this.form.value);
      this.service.update(this.entite).subscribe(res => {
        alert('Product Owner updated');
      },
      err => {
        console.log('Request failed to update PO');
      });
    } else {
      this.entite = Object.assign({}, this.form.value);
      this.service.create(this.entite).subscribe(res => {
        alert('A new Product Owner created!');
        this.router.navigate(['businessmanager']);
      },
      err => {
        console.log('error on submitting PO');
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }

}


