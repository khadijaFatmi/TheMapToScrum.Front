import { Component, OnInit } from '@angular/core';
import { ProjetUserStory } from './models/projetUserStory.model';

import { Observable } from 'rxjs';
import '../assets/js/mySketch.js';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Map To Scrum';
  liste: Observable<ProjetUserStory[]>;


}
