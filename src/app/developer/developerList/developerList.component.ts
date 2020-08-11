import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developerList.component.html',
  styleUrls: ['./developerList.component.css']
})
export class DeveloperListComponent implements OnInit {

  public developer: Developer[];

  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;

  constructor(private service: DeveloperService, private router: Router) {
  }

  ngOnInit() {

      this.service.liste().
      subscribe(data => {
        this.developer = data;
        this.dataSource = this.developer;
      },
      error => {
        console.log('erreur lecture Developer :-/');
      });

  }

  edit(objet: Developer): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('developerid');
    window.localStorage.setItem('developerid', objet.id.toString());
    this.router.navigate(['developerdetail']);
  }

  delete(objet: Developer): void {
    const id = objet.id;
    this.service.delete(id).
      subscribe(data => {
        alert('delete success');
        this.router.navigate(['/developer']);
      },
      error => {
        console.log('erreur lecture Dev :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('developeridid');
    this.router.navigate(['developerdetail']);
  }

}
