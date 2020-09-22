import { Component, OnInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastaService, ToastOptions } from 'ngx-toasta';
import { Subscription } from 'rxjs';


import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamDetail.component.html',
  styleUrls: ['./teamDetail.component.css']
})

export class TeamDetailComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private id: number;
  public entite: Team;
  public isLoading = false;
  private subscriptions: Subscription [] = [];

  toastOptions: ToastOptions = {
    title: 'Developers Teams Details',
    showClose: true,
    timeout: 5000,
  };

  constructor(private service: TeamService
            , private fb: FormBuilder
            , private router: Router
            , private toastService: ToastaService) { }

  ngOnInit() {
    this.isLoading = true;
    if (window.localStorage.getItem('teamid') != null) {
      this.id = Number(window.localStorage.getItem('teamid'));
      console.log('team ID stored locally' + ' ' + this.id);
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
      this.subscriptions.push(
      this.service.getById(this.id).
      subscribe(data => {
        this.entite = data;
        this.updateform();
        console.log('Request Successful, Developers Team Details Loaded!');
        this.isLoading = false;
        this.toastOptions.msg = 'Success! Developers Team Details Loaded';
        this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Fail! Developers Teams Details not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Developers Team Details';
          this.toastService.error(this.toastOptions);
        }));
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
      this.subscriptions.push(
      this.service.update(this.entite).subscribe(res => {
        console.log('Request Successful, Developers Team Has Been Updated!');
        this.toastOptions.msg = 'Success! Developers Team Has Been Updated';
        this.toastService.success(this.toastOptions);
        this.router.navigate(['/team']);
      },
      error => {
        console.log('Request Fail, Developers Team Has Not Been Updated!');
        this.toastOptions.msg = 'Fail! Developers Team Has Not Been Updated';
        this.toastService.success(this.toastOptions);
      }
      ));
      } else {
        this.entite = Object.assign({}, this.form.value);
        this.service.create(this.entite).subscribe(res => {
          console.log('Request Successful, Developer has been created!');
          this.toastOptions.msg = 'Success! A New Developers Team Has Been Created';
          this.toastService.success(this.toastOptions);
          this.router.navigate(['/team']);
      });
    }
}

ngOnDestroy() {
  this.subscriptions.forEach(subscription => subscription.unsubscribe());
}

}
