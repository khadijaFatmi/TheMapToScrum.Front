import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService} from '../../services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './teamList.component.html',
  styleUrls: ['./teamList.component.css']
})
export class TeamListComponent implements OnInit {

  public team: Team[];
  displayedColumns: string[] = ['label', 'action'];
  public dataSource: any;
  public isLoading = false;

  constructor(private service: TeamService, private router: Router) { }

  ngOnInit() {
    this.listeEntities();
  }

  listeEntities(): void {
    this.isLoading = true;
    this.service.liste().
    subscribe(data => {
      this.team = data;
      this.dataSource = this.team;
      console.log('lecture team OK', data);
      this.isLoading = false;
    },
      error => {
        console.log('lecture Team KO');
        this.isLoading = false;
      }
    );
  }

  edit(objet: Team): void {
    console.log('objet Team', objet);
    window.localStorage.removeItem('teamid');
    window.localStorage.setItem('teamid', objet.id.toString());
    this.router.navigate(['teamdetail']);
  }

  delete(objet: Team): void {
    const id = objet.id;
    this.service.delete(id).
    subscribe(data => {
      alert('Team deleted, success');
       //  refresh list
       this.listeEntities();
    },
      error => {
        console.log('erreur lecture Team');
      });
  }

  Add() {
    window.localStorage.removeItem('teamid');
    this.router.navigate(['teamdetail']);
  }

}
