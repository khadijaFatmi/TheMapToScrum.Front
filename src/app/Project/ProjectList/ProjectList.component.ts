import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.css']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[];
  displayedColumns: string[] = ['label', 'scrumMaster', 'productOwner',
  'team', 'department', 'status', 'action'];
  public dataSource: any;
  public isLoading = false;

  constructor(private service: ProjectService, private router: Router) {
  }

  ngOnInit() {
    this.listEntities();
  }

  listEntities(): void {
    this.isLoading = true;
    this.service.liste().
    subscribe(data => {
    this.projects = data;
    this.dataSource = this.projects;
    console.log('lecture ok kdij :-)', data);
    this.isLoading = false;
    },
      error => {
        console.log('erreur lecture :-/');
        this.isLoading = false;
      }
    );
  }


  edit(objet: Project): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('projectId');
    window.localStorage.setItem('projectId', objet.id.toString());
    this.router.navigate(['projectdetail']);
  }

  delete(objet: Project): void {
    const id = objet.id;
    this.service.delete(id).
      subscribe(data => {
        alert('delete success');
        this.listEntities();
      },
      error => {
        console.log('erreur lecture :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('projectId');
    this.router.navigate(['projectdetail']);
  }
}
