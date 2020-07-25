import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../UserStory.service';
import { UserStory } from '../../models/UserStory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userstory',
  templateUrl: './UserStory.component.html',
  styleUrls: ['./UserStory.component.css']
})
export class UserStoryComponent implements OnInit {
  public userstory: UserStory[];
  displayedColumns: string[] = ['version', 'projet', 'name', 'role', 'function1',
  'function2', 'notes', 'priority', 'storyPoints', 'epicStory', 'action'];
  public dataSource: any;

  constructor(private service: UserStoryService, private router: Router) {
  }

  ngOnInit() {
   this.service.liste().
   subscribe(data => {
    this.userstory = data;
    this.dataSource = this.userstory;
    console.log('lecture US ok kdij :-)', data);
  },
  error => {
    console.log('erreur lecture :-/');
  }
   );
  }

  edit(objet: UserStory): void {
    console.log('objet ', objet);
    window.localStorage.removeItem('userstoryid');
    window.localStorage.setItem('userstoryid', objet.id.toString());
    this.router.navigate(['userstorydetail']);
  }
}
