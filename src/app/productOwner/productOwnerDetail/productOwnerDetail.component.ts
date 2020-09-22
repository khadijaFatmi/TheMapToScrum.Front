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
          this.isLoading = false;
          console.log('Request Successful, Product Owners Details Loaded!');
          this.toastOptions.msg = 'Success! Product Owners Details Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          this.isLoading = false;
          console.log('Fail! Product Owners details not loaded!');
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
      this.subscriptions.push(
      this.service.update(this.entite).subscribe(res => {
        console.log('Request Successful, Product Owner updated!');
        this.toastOptions.msg = 'Success! Product Owner Has Been Updated';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Fail! Product Owner not updated!');
        this.toastOptions.msg = 'Failed to Update Product Owner';
        this.toastService.error(this.toastOptions);
      }));
    } else {
      this.entite = Object.assign({}, this.form.value);
      this.subscriptions.push(
      this.service.create(this.entite).subscribe(res => {
        console.log('Request Successful, Product Owner created!');
        this.toastOptions.msg = 'Success! A New Product Owner Has Been Created';
        this.toastService.success(this.toastOptions);
        this.router.navigate(['businessmanager']);
      },
      error => {
        console.log('Fail! Product Owner not created!');
        this.toastOptions.msg = 'Failed to Create Product Owner! No New Product Owner!';
        this.toastService.error(this.toastOptions);
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }

}


