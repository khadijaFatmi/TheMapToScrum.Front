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

  constructor(private service: TeamService, private router: Router) { }

  ngOnInit() {
    this.service.liste().
    subscribe(data => {
      this.team = data;
      this.dataSource = this.team;
      console.log('lecture team OK', data);
    },
      error => {
        console.log('lecture Team KO');
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
      this.router.navigate(['/team']);
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
