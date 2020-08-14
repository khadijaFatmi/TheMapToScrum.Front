import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/userStory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userstory',
  templateUrl: './userStoryList.component.html',
  styleUrls: ['./userStoryList.component.css']
})
export class UserStoryListComponent implements OnInit {
  public userstory: UserStory[];

  // 1ere version de la liste, trop de champs inutiles pour l'utilisateur,seront visible
  // dans détail
  // displayedColumns: string[] = ['version', 'projet', 'name', 'role', 'function1',
  // 'function2', 'notes', 'priority', 'storyPoints', 'epicStory', 'action'];

  displayedColumns: string[] = ['version', 'project', 'title', 'role', 'priority', 'storyPoints', 'epicStory', 'action'];
  public dataSource: any;

  constructor(private service: UserStoryService, private router: Router) {
  }

  ngOnInit() {

      this.service.liste().
      subscribe(data => {
        this.userstory = data;
        this.dataSource = this.userstory;
        console.log('lecture us ok');
      },
      error => {
        console.log('erreur lecture :-/');
      });

  }

  edit(objet: UserStory): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('userstoryid');
    window.localStorage.setItem('userstoryid', objet.id.toString());
    this.router.navigate(['userstorydetail']);
  }

  delete(objet: UserStory): void {
    const id = objet.id;
    this.service.delete(id).
      subscribe(data => {
        console.log('msg is delete OK, USid:' + ' ' + id);
        alert('US deleted, success');
        this.router.navigate(['/userstory']);
      },
      error => {
        console.log('erreur lecture US :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('userstoryid');
    this.router.navigate(['userstorydetail']);
  }
}
