import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './departmentList.component.html',
  styleUrls: ['./departmentList.component.css']
})
export class DepartmentListComponent implements OnInit {

  public department: Department[];
  public isLoading = false;

  constructor(private service: DepartmentService, private router: Router) { }

  displayedColumns: string[] = ['label', 'action'];
  public dataSource: any;

  ngOnInit() {
    this.listEntities();
  }

  listEntities(): void {
    this.isLoading = true;
    this.service.liste().
    subscribe(data => {
      this.department = data;
      this.dataSource = this.department;
      this.isLoading = false;
    },
    error => {
      console.log('erreur lecture department :-/');
      this.isLoading = false;
    });
  }

  edit(objet: Department): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('departmentid');
    window.localStorage.setItem('departmentid', objet.id.toString());
    this.router.navigate(['departmentDetail']);
  }


  delete(objet: Department): void {
    const id = objet.id;
    this.service.delete(id).
      subscribe(data => {
        alert('department deleted, success');
        // refresh Dept List
        this.listEntities();
      },
      error => {
        console.log('erreur lecture :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('departmentid');
    this.router.navigate(['departmentDetail']);
  }

}






