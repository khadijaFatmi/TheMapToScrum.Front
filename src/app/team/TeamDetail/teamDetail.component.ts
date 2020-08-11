import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamDetail.component.html',
  styleUrls: ['./teamDetail.component.css']
})

export class TeamDetailComponent implements OnInit {

  public form: FormGroup;
  private id: number;
  public entite: Team;

  constructor(private service: TeamService, private fb: FormBuilder) { }

  ngOnInit() {
    if(window.localStorage.getItem('teamid') != null) {
      this.id = Number(window.localStorage.getItem('teamid'));
    } else {
      this.id = 0;
    }

    this.form = this.fb.group({
      id: [''],
      label: ['', Validators.required],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']
    });
    if (this.id !== 0) {
      this.service.getById(this.id).
      subscribe(data => {
        this.entite = data;
        this.updateform();
      },
      error => {
        console.log('erreur lecture Team');
      });

    }

  }

  updateform(): void {
    this.form.patchValue({
      id: this.entite.id
      , label: this.entite.label
      , dateCreation: this.entite.dateCreation
      , dateModification: this.entite.dateModification
      , isDeleted: this.entite.isDeleted
    });
  }


  onSubmit(): void {
    if (this.id !== 0) {
      console.log('id not null');

      this.entite = Object.assign({}, this.form.value);
      this.service.update(this.entite).subscribe(res => {
        alert('Team updated!');
      },
      err => {
        console.log()
      }
      )
    }
    else {
      this.entite = Object.assign({}, this.form.value);
      this.service.create(this.entite).subscribe(res => {
        alert('success! Team created!');
      console.log('creation');

      });

  }

  }
}
