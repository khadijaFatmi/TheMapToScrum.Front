import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department} from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';


@Component({
  selector: 'app-departmentdetail',
  templateUrl: './departmentDetail.component.html',
  styleUrls: ['./departmentDetail.component.css']
})
export class DepartmentDetailComponent implements OnInit {


    public form: FormGroup;
    private id: number;
    public entite: Department;

    constructor(private service: DepartmentService
      ,         private fb: FormBuilder) {
    }

    ngOnInit() {
     this.id = Number(window.localStorage.getItem('departmentid'));
     this.form = this.fb.group({
      id: [''],
      label: [''],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: ['']
    });
     if (this.id !== null) {
      this.service.getById(this.id).
      subscribe(data => {
        this.entite = data;
        this.updateform();
      },
      error => {
        console.log('erreur lecture :-/');
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
      console.log('envoi ');
      if (this.id !== null) {
        this.entite = Object.assign({}, this.form.value);
        this.service.update(this.entite).subscribe(res => {
          alert('Department updated, success!');
        },
        err => {
          console.log('error');
        });
      } else {
        this.entite = Object.assign({}, this.form.value);
        this.service.create(this.entite).subscribe(res => {
          alert('Department updated, success!');
        },
        err => {
          console.log('Error when creating Department');
        });
      }
    }

  }

