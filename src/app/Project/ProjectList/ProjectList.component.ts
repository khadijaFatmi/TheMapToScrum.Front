import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Project.service';
import { Projet } from '../../models/projets.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectliste',
  templateUrl: './ProjectList.component.html',
  styleUrls: ['./ProjectList.component.css']
})
export class ProjectListComponent implements OnInit {
  public projets: Projet[];
  displayedColumns: string[] = ['label', 'author', 'team', 'department', 'creationdate', 'action'];
  public dataSource: any;

  constructor(private service: ProjetService, private router: Router) {
  }

  ngOnInit() {
   this.service.liste().
   subscribe(data => {
    this.projets = data;
    this.dataSource = this.projets;
    console.log('lecture ok kdij :-)', data);
    },
      error => {
        console.log('erreur lecture :-/');
      }
    );
  }


  edit(objet: Projet): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('projetId');
    window.localStorage.setItem('projetId', objet.id.toString());
    this.router.navigate(['projectdetail']);
  }

  delete(objet: Projet): void {
    const id = objet.id;
    this.service.delete(id).
      subscribe(data => {
        alert('delete success');
        this.router.navigate(['/project']);
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
