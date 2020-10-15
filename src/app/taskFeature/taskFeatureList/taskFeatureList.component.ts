import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastaService, ToastOptions } from 'ngx-toasta';

import { TaskFeature } from 'src/app/models/taskfeature.model';
import { TaskFeatureService } from '../../services/taskFeature.service';
import { TaskFeatureDetailComponent } from '../taskFeatureDetail/taskFeatureDetail.component';

@Component({
  selector: 'app-taskfeature',
  templateUrl: './taskFeatureList.component.html',
  styleUrls: ['./taskFeatureList.component.css']
})
export class TaskFeatureListComponent implements OnInit, OnDestroy {

  public taskFeature: TaskFeature[];
  public isLoading = false;
  private subscriptions: Subscription[] = [];


  displayedColumns: string[] = ['number', 'label', 'project', 'userstory', 'priority', 'estimatedDuration', 'taskStatus', 'developer', 'action'];
  public dataSource: any;

  toastOptions: ToastOptions = {
    title: 'Tasks List',
    showClose: true,
    timeout: 5000,
  };


  constructor(private service: TaskFeatureService
            , private dialog: MatDialog, private dialogService: DialogService
            , private router: Router
            , private toastService: ToastaService) {
  }

  ngOnInit() {
    this.loadTaskEntities();
  }

  loadTaskEntities(): void {
      this.isLoading = true;
      this.subscriptions.push(
        this.service.liste().
        subscribe(data => {
          this.taskFeature = data;
          this.dataSource = this.taskFeature;
          console.log('Request Success! Tasks List Has Been Loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Success! Tasks List Has Been Loaded';
          this.toastService.success(this.toastOptions);
        },
        error => {
          console.log('Request Fail! Tasks list not loaded!');
          this.isLoading = false;
          this.toastOptions.msg = 'Failed to Load Tasks List';
          this.toastService.error(this.toastOptions);
        }));

  }



  delete(objet: TaskFeature): void {
    const id = objet.id;
    this.subscriptions.push(
    this.service.delete(id).
      subscribe(data => {
        console.log('Request Success! Task Has Been deleted!');
        this.toastOptions.msg = 'Success! Task Has Been  Deleted';
        this.toastService.success(this.toastOptions);
        // refresh TASK list after deleting
        this.loadTaskEntities();
      },
      error => {
        console.log('Request Fail! Task Has Not Been deleted!');
        this.toastOptions.msg = 'Fail! Task Has Not Been Deleted';
        this.toastService.error(this.toastOptions);
      }));
  }



  addOrEdit(index, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.height = '100%';
    dialogConfig.data = {index, id};
    const dialogRef = this.dialog.open(TaskFeatureDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        switch (data.id) {
          case id: {
            const indice = this.findIndexofEntity(data.id);
            this.taskFeature[indice] = data;
            this.updateTableEntities();
            break;
          }
          case 0: {
             break;
          }
          default: {
            this.dataSource.data.push(data);
            this.dataSource.filter = '';
            // this.totalCount ++;
            break;
          }
        }
      }
    );
  }

  updateTableEntities() {
    this.dataSource.data = this.taskFeature;
  }

  findIndexofEntity(id: number): number {
    const index = this.taskFeature.findIndex(t => t.id === id);
    return index;
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

