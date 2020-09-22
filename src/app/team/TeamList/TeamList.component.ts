import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { TeamService} from '../../services/team.service';
import { Team } from '../../models/team.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './teamList.component.html',
  styleUrls: ['./teamList.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {

  public team: Team[];
  displayedColumns: string[] = ['label', 'action'];
  public dataSource: any;
  public isLoading = false;
  private subscriptions: Subscription[] = [];

  toastOptions: ToastOptions = {
    title: 'Developer Teams List',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: TeamService
            , private router: Router
            , private toastService: ToastaService) { }

  ngOnInit() {
    this.listeEntities();
  }

  listeEntities(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.service.liste().
      subscribe(data => {
        this.team = data;
        this.dataSource = this.team;
        this.isLoading = false;
        console.log('Request Successful, Developer Teams List Loaded!');
        this.toastOptions.msg = 'Success! Developer Teams List Loaded';
        this.toastService.success(this.toastOptions);
        },
        error => {
          this.isLoading = false;
          console.log('Fail! Developer Teams List not loaded!');
          this.toastOptions.msg = 'Failed to Load Developer Teams List';
          this.toastService.error(this.toastOptions);
      }));
  }

  edit(objet: Team): void {
    console.log('objet Team', objet);
    window.localStorage.removeItem('teamid');
    window.localStorage.setItem('teamid', objet.id.toString());
    this.router.navigate(['teamdetail']);
  }

  delete(objet: Team): void {
    const id = objet.id;
    this.subscriptions.push(
      this.service.delete(id).
      subscribe(data => {
        console.log('Request Successful, Developer Teams deleted!');
        this.toastOptions.msg = 'Success! Developer Team Has Been Deleted';
        this.toastService.success(this.toastOptions);
       //  refresh list
        this.listeEntities();
      },
        error => {
          console.log('Request Fail! Developer Teams deleted!');
          this.toastOptions.msg = 'Fail! Developer Team Has Not Been Deleted';
          this.toastService.error(this.toastOptions);
      }));
  }

  Add() {
    window.localStorage.removeItem('teamid');
    this.router.navigate(['teamdetail']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
