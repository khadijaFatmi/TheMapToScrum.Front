import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { ProductOwnerService } from '../../services/productOwner.service';
import { ProductOwner} from '../../models/productOwner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productowner',
  templateUrl: './productownerList.component.html',
  styleUrls: ['./productownerList.component.css']
})
export class ProductOwnerListComponent implements OnInit, OnDestroy {

  public techMgr: ProductOwner[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'Product Owners List',
    showClose: true,
    timeout: 5000,
  };

  constructor(private service: ProductOwnerService
            , private router: Router
            , private toastService: ToastaService  ) { }

  ngOnInit() {
    this.listEntities();
  }
  listEntities(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.service.liste().
      subscribe(data => {
        this.techMgr = data;
        this.dataSource = this.techMgr;
        console.log('Request Successful, Product Owners List Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! Product Owners List Loaded';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Fail! Product Owners list not loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Failed to Load Product Owners List';
        this.toastService.error(this.toastOptions);
    }));
  }


edit(objet: ProductOwner): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('productOwnerId');
  window.localStorage.setItem('productOwnerId', objet.id.toString());
  this.router.navigate(['productownerdetail']);
}

delete(objet: ProductOwner): void {
  const id = objet.id;
  this.subscriptions.push(
    this.service.delete(id).
      subscribe(data => {
        alert('Request Successful, Product Owner deleted :-)');
        // refresh list
        this.listEntities();
      },
      error => {
        console.log('Request Failed to read PO :-/');
  }));
}

Add() {
  window.localStorage.removeItem('productOwnerId');
  this.router.navigate(['productownerdetail']);
}

ngOnDestroy() {
  this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
}
}

