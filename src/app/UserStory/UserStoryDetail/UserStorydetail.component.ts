import { Component, OnInit } from '@angular/core';
import { UserStoryService } from './../UserStory.service';
import { UserStory } from './../../models/userstory.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Projet } from 'src/app/models/projets.model';
import { ProjetService } from 'src/app/ProjetUS/ProjetUSListe.service';

import { MatRadioChange } from '@angular/material';




@Component({
  selector: 'app-userstorydetail',
  templateUrl: './UserStoryDetail.component.html',
  styleUrls: ['./UserStoryDetail.component.css']
})
export class UserStoryDetailComponent implements OnInit {
  public form: FormGroup;
  private id: number;
  public entite: UserStory;
  public projets: Projet[];
  public filter: boolean;

  constructor(private service: UserStoryService, private route: ActivatedRoute
    ,         private fb: FormBuilder, private ps: ProjetService) {

  }

  ngOnInit() {
   this.id = Number(window.localStorage.getItem('userstoryid'));
   this.service.getById(this.id).
   subscribe(data => {
    this.entite = data;
    this.form = this.fb.group({
      id: [''],
      projetId: ['', Validators.required],
      titre: ['', Validators.required],
      version: [''],
      role: ['', Validators.required],
      function1: ['', Validators.required],
      function2: ['', Validators.required],
      notes: ['', Validators.required],
      priority: ['', Validators.required],
      storyPoints: ['', Validators.required],
      epicStory: ['', Validators.required],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']

    });

    this.ps.liste().
    subscribe(data => {
      this.projets = data;

    });

    this.updateform();
    console.log('lecture USdetail ok kdij :-)', data);
  },
  error => {
    console.log('erreur lecture :-/');
  }
   );
  }

  updateform(): void {
    this.form.patchValue({
      id: this.entite.id
      , projetId: this.entite.projetId
      , titre: this.entite.titre
      , version: this.entite.version
      , role: this.entite.role
      , function1: this.entite.function1
      , function2: this.entite.function2
      , notes: this.entite.notes
      , priority: this.entite.priority
      , storyPoints: this.entite.storyPoints
      , epicStory: this.entite.epicStory
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
    console.log('valeur' + this.entite.epicStory);
  }


  radioChangeHandler($event: any) {
    this.entite.epicStory = $event.source.value;

    //this.form.setValue(epicStory) = $event.source.value;
    console.log($event.source.name, $event.value);
  }

  onSubmit(): void {
    console.log('envoi ' + this.entite.epicStory);

    const test = this.form.get('epicStory');
    console.log('test ', test);
    this.entite = Object.assign({}, this.form.value, test);
    this.service.update(this.entite).subscribe(res => {
      alert('update success + ' + this.entite);
    },
    err => {
      console.log('error');
    }
    );
  }

}
