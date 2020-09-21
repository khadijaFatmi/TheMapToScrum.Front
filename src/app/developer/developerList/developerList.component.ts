import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from 'src/app/models/developer.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developerList.component.html',
  styleUrls: ['./developerList.component.css']
})
export class DeveloperListComponent implements OnInit {

  public developer: Developer[];
  public isLoading = false;
  public dataSource: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];

  toastOptions: ToastOptions = {
    title: 'Developers List',
    showClose: true,
    timeout: 5000,
  };

  constructor(private service: DeveloperService
            , private router: Router
            , private toastService: ToastaService) {
  }

  ngOnInit() {

      this.isLoading = true;
      this.service.liste().
      subscribe(data => {
        this.developer = data;
        this.dataSource = this.developer;
        console.log('Request Successful, Developer List Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! Developer List Loaded';
        this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Developer list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Developer List';
          this.toastService.error(this.toastOptions);
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
        alert('Request successful, deleted Developer :-)');
        this.router.navigate(['/developer']);
      },
      error => {
        console.log('Request failed to read Developer:-/');
      });
  }

  Add() {
    window.localStorage.removeItem('developeridid');
    this.router.navigate(['developerdetail']);
  }

}
