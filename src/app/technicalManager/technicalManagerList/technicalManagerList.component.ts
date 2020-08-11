import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TechnicalManagerService } from '../../services/technicalManager.service';
import { TechnicalManager} from '../../models/technicalManager.model';

@Component({
  selector: 'app-technicalmanager',
  templateUrl: './technicalManagerList.component.html',
  styleUrls: ['./technicalManagerList.component.css']
})
export class TechnicalManagerListComponent implements OnInit {

  public techMgr: TechnicalManager[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;

  constructor(private service: TechnicalManagerService, private router: Router) { }

  ngOnInit() {
    this.service.liste().
    subscribe(data => {
      this.techMgr = data;
      this.dataSource = this.techMgr;
      console.log('lecture team ok' , data);
    },
       error => {
        console.log('lecture techMgr ko');
       }

    );
}


edit(objet: TechnicalManager): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('techMgrid');
  window.localStorage.setItem('techMgrId', objet.id.toString());
  this.router.navigate(['technicalmanagerdetail']);
}

delete(objet: TechnicalManager): void {
  const id = objet.id;
  this.service.delete(id).
    subscribe(data => {
      alert('delete success');
      this.router.navigate(['/technicalmanager']);
    },
    error => {
      console.log('erreur lecture :-/');
    });
}

Add() {
  window.localStorage.removeItem('techMgrid');
  this.router.navigate(['technicalmanagerdetail']);
}

}

