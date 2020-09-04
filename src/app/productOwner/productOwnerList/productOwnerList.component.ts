import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductOwnerService } from '../../services/productOwner.service';
import { ProductOwner} from '../../models/productOwner.model';

@Component({
  selector: 'app-productowner',
  templateUrl: './productownerList.component.html',
  styleUrls: ['./productownerList.component.css']
})
export class ProductOwnerListComponent implements OnInit {

  public techMgr: ProductOwner[];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public dataSource: any;
  public isLoading = false;

  constructor(private service: ProductOwnerService, private router: Router) { }

  ngOnInit() {
    this.listEntities();
  }
  listEntities(): void {
    this.isLoading = true;
    this.service.liste().
    subscribe(data => {
      this.techMgr = data;
      this.dataSource = this.techMgr;
      console.log('lecture productowner ok' , data);
      this.isLoading = false;
    },
       error => {
        console.log('lecture productowner ko');
        this.isLoading = false;
       }

    );
}


edit(objet: ProductOwner): void {
  console.log('objet ', objet);
  window.localStorage.removeItem('productOwnerId');
  window.localStorage.setItem('productOwnerId', objet.id.toString());
  this.router.navigate(['productownerdetail']);
}

delete(objet: ProductOwner): void {
  const id = objet.id;
  this.service.delete(id).
    subscribe(data => {
      alert('delete success');
      // refresh list
      this.listEntities();
    },
    error => {
      console.log('erreur lecture :-/');
    });
}

Add() {
  window.localStorage.removeItem('productOwnerId');
  this.router.navigate(['productownerdetail']);
}

}

