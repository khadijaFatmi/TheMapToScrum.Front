import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ScrumMasterService } from '../../services/scrumMaster.service';
import { ScrumMaster} from '../../models/scrumMaster.model';

@Component({
  selector: 'app-scrummaster',
  templateUrl: './scrumMasterList.component.html',
  styleUrls: ['./scrumMasterList.component.css']
})
export class ScrumMasterListComponent implements OnInit {

  public scrumMaster: ScrumMaster[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;

  constructor(private service: ScrumMasterService, private router: Router) { }

  ngOnInit() {
    this.listeEntities();
}

listeEntities(): void {
  this.service.liste().
    subscribe(data => {
      this.scrumMaster = data;
      this.dataSource = this.scrumMaster;
      console.log('lecture Scrum Master ok' , data);
    },
       error => {
        console.log('lecture Scrum Master ko');
       }

    );
}

edit(objet: ScrumMaster): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('productOwnerd');
  window.localStorage.setItem('scrumMasterId', objet.id.toString());
  this.router.navigate(['productownerdetail']);
}

delete(objet: ScrumMaster): void {
  const id = objet.id;
  this.service.delete(id).
    subscribe(data => {
      alert('delete success');
      //  refresh list
      this.listeEntities();
    },
    error => {
      console.log('erreur lecture :-/');
    });
}

Add() {
  window.localStorage.removeItem('scrummasterId');
  this.router.navigate(['scrummasterdetail']);
}

}

