import { Component } from '@angular/core';
import { DaySchedule } from '../types/DaySchedule';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from './tasks-service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  daysSchedule: DaySchedule[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.daysSchedule = this.tasksService.getDaysSchedule();
  }
}
