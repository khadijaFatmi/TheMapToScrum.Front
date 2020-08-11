import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BusinessManagerService } from '../../services/businessManager.service';
import { BusinessManager} from '../../models/businessManager.model';

@Component({
  selector: 'app-businessmanager',
  templateUrl: './businessManagerList.component.html',
  styleUrls: ['./businessManagerList.component.css']
})
export class BusinessManagerListComponent implements OnInit {

  public techMgr: BusinessManager[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;

  constructor(private service: BusinessManagerService, private router: Router) { }

  ngOnInit() {
    this.service.liste().
    subscribe(data => {
      this.techMgr = data;
      this.dataSource = this.techMgr;
      console.log('lecture bizMgr ok' , data);
    },
       error => {
        console.log('lecture bizMgr ko');
       }

    );
}


edit(objet: BusinessManager): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('bizMgrId');
  window.localStorage.setItem('bizMgrId', objet.id.toString());
  this.router.navigate(['businessmanagerdetail']);
}

delete(objet: BusinessManager): void {
  const id = objet.id;
  this.service.delete(id).
    subscribe(data => {
      alert('delete success');
      this.router.navigate(['/businessmanager']);
    },
    error => {
      console.log('erreur lecture :-/');
    });
}

Add() {
  window.localStorage.removeItem('bizMgrId');
  this.router.navigate(['businessmanagerdetail']);
}

}

