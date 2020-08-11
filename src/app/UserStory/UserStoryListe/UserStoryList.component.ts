import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../../services/userStory.service';
import { UserStory } from '../../models/UserStory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userstory',
  templateUrl: './UserStoryList.component.html',
  styleUrls: ['./UserStoryList.component.css']
})
export class UserStoryListComponent implements OnInit {
  public userstory: UserStory[];

  // 1ere version de la liste, trop de champs inutiles pour l'utilisateur,seront visible
  // dans détail
  // displayedColumns: string[] = ['version', 'projet', 'name', 'role', 'function1',
  // 'function2', 'notes', 'priority', 'storyPoints', 'epicStory', 'action'];

  displayedColumns: string[] = ['version', 'project', 'role', 'priority', 'storyPoints', 'epicStory', 'action'];
  public dataSource: any;

  constructor(private service: UserStoryService, private router: Router) {
  }

  ngOnInit() {

      this.service.liste().
      subscribe(data => {
        this.userstory = data;
        this.dataSource = this.userstory;
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
        alert('delete success');
        this.router.navigate(['/userstory']);
      },
      error => {
        console.log('erreur lecture :-/');
      });
  }

  Add() {
    window.localStorage.removeItem('userstoryid');
    this.router.navigate(['userstorydetail']);
  }
}
