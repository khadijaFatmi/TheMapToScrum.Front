import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-project',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public projects: Project[];
  displayedColumns: string[] = ['label', 'scrumMaster', 'productOwner',
  'team', 'department', 'status', 'action'];
  public dataSource: any;
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'Projects List',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: ProjectService
    ,         private router: Router
    ,         private toastService: ToastaService) {
  }

  ngOnInit() {
    this.listEntities();
  }

  listEntities(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.service.liste().
      subscribe(data => {
        this.projects = data;
        this.dataSource = this.projects;
        console.log('Request Successful! List of all projects Loaded :-)');
        this.toastOptions.msg = 'Success! List Of All Projects Loaded!';
        this.toastService.success(this.toastOptions);
      },
      error => {
        console.log('Request Failed to Load Projects List');
        this.isLoading = false;
        this.toastOptions.msg = 'Failed to Load Projects List';
        this.toastService.error(this.toastOptions);

      }
    ));
  }


  edit(objet: Project): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('projectId');
    window.localStorage.setItem('projectId', objet.id.toString());
    this.router.navigate(['projectdetail']);
  }

  delete(objet: Project): void {
    const id = objet.id;
    this.subscriptions.push(
      this.service.delete(id).
        subscribe(data => {
          console.log('Request Successful! Project deleted :-)');
          this.toastOptions.msg = 'Success! Project Deleted!';
          this.toastService.success(this.toastOptions);
          this.listEntities();
        },
        error => {
          console.log('Request Fail! Project not deleted :-)');
          this.toastOptions.msg = 'Fail! Project Has Not Been Deleted!';
          this.toastService.success(this.toastOptions);
      }));
  }

  Add() {
    window.localStorage.removeItem('projectId');
    this.router.navigate(['projectdetail']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }
}
