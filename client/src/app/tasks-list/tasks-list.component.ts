import { Component } from '@angular/core';
import { DaySchedule } from '../types/DaySchedule';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  daysSchedule: DaySchedule[] = [
    {
      day: 'Luni',
      tasks: [
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
      ],
    },
    {
      day: 'Marti',
      tasks: [
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
      ],
    },
    {
      day: 'Miercuri',
      tasks: [],
    },
    {
      day: 'Joi',
      tasks: [],
    },
    {
      day: 'Vineri',
      tasks: [
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
        { title: 'Task 1', startTime: '10:00', endTime: '11:00' },
      ],
    },
    {
      day: 'Sambata',
      tasks: [],
    },
    {
      day: 'Duminica',
      tasks: [],
    },
  ];
}
