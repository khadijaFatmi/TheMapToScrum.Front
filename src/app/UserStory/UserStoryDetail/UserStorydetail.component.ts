import { Component, OnInit } from '@angular/core';
import { UserStoryService } from './../UserStory.service';
import { UserStory } from './../../models/userstory.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userstorydetail',
  templateUrl: './UserStoryDetail.component.html',
  styleUrls: ['./UserStoryDetail.component.css']
})
export class UserStoryDetailComponent implements OnInit {
  private id: number;
  public userstory: UserStory;
  displayedColumns: string[] = ['titre'];
  public dataSource: any;
  titre = new FormControl('');

  constructor(private service: UserStoryService, private route: ActivatedRoute) {

  }

  ngOnInit() {
   this.route.params.subscribe(params => {
     this.id = params['id'];
    });
   this.service.getById(this.id).
   subscribe(data => {
    this.userstory = data;
    this.updateform();
    console.log('lecture USdetail ok kdij :-)', data);
  },
  error => {
    console.log('erreur lecture :-/');
  }
   );
}
updateform(): void {
  this.titre.setValue(this.userstory.name);
}
}
