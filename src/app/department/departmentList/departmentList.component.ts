import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { Department } from 'src/app/models/department.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './departmentList.component.html',
  styleUrls: ['./departmentList.component.css']
})
export class DepartmentListComponent implements OnInit, OnDestroy {

  public department: Department[];
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  constructor(private service: DepartmentService
            , private router: Router
            , private toastService: ToastaService) { }

  displayedColumns: string[] = ['label', 'action'];
  public dataSource: any;

  toastOptions: ToastOptions = {
    title: 'Entity Departments List',
    showClose: true,
    timeout: 5000,
  };


  ngOnInit() {
    this.listEntities();
  }

  listEntities(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.service.liste().
      subscribe(data => {
        this.department = data;
        this.dataSource = this.department;
        this.isLoading = false;
        console.log('Dpt list Request Success:-)');
        this.toastOptions.msg = 'Success! Departments List Loaded';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Dpt list Request Fail:-/');
        this.isLoading = false;
        this.toastOptions.msg = 'Fail! Error While Loading Departments List';
        this.toastService.error(this.toastOptions);
    }));
  }

  edit(objet: Department): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('departmentid');
    window.localStorage.setItem('departmentid', objet.id.toString());
    this.router.navigate(['departmentDetail']);
  }


  delete(objet: Department): void {
    const id = objet.id;
    this.subscriptions.push(
      this.service.delete(id).
      subscribe(data => {
        console.log('Request Success: Department deleted-)');
        this.toastOptions.msg = 'Success! Department Has Been Deleted';
        this.toastService.success(this.toastOptions);
        // refresh Dept List
        this.listEntities();
      },
      error => {
        console.log('Request Fail: Department not deleted-)');
        this.toastOptions.msg = 'Fail! Department Has Not Been Deleted';
        this.toastService.success(this.toastOptions);
      }));
  }

  Add() {
    window.localStorage.removeItem('departmentid');
    this.router.navigate(['departmentDetail']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }

}






