import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Project.service';
import { Projet } from '../../models/projets.model';

@Component({
  selector: 'app-projectliste',
  templateUrl: './ProjectList.component.html',
  styleUrls: ['./ProjectList.component.css']
})
export class ProjectListComponent implements OnInit {
  public projets: Projet[];
  displayedColumns: string[] = ['label', 'author', 'team', 'department', 'creationdate', 'action'];
  public dataSource: any;

  constructor(private service: ProjetService) {
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
}
