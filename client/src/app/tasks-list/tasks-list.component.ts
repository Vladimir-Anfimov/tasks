import { Component, OnInit } from '@angular/core';
import { DaySchedule } from '../types/DaySchedule';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from './tasks-service';
import { AddOrEditTaskDialogComponent } from './add-or-edit-task-dialog/add-or-edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../types/Task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    AddOrEditTaskDialogComponent,
    CdkDropList,
    CdkDrag,
    MatIconModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnInit {
  daysSchedule$?: Observable<DaySchedule[]>;

  constructor(private tasksService: TasksService, public dialog: MatDialog) {}

  ngOnInit() {
    this.daysSchedule$ = this.tasksService.daysSchedule;
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddOrEditTaskDialogComponent, {
      width: '600px',
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(AddOrEditTaskDialogComponent, {
      width: '600px',
      data: task,
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task);
  }
}
