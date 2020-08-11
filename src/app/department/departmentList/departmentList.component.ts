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

  constructor(private service: DepartmentService, private router: Router) { }

  displayedColumns: string[] = ['label', 'action'];
  public dataSource: any;

  ngOnInit() {
    this.service.liste().
    subscribe(data => {
      this.department = data;
      this.dataSource = this.department;
    },
    error => {
      console.log('erreur lecture department :-/');
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
        this.router.navigate(['/department']);
      },
      error => {
        console.log('erreur lecture :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('departmentid');
    this.router.navigate(['departmentdetail']);
  }

}






