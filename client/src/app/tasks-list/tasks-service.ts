import { Injectable } from '@angular/core';
import { DaySchedule } from '../types/DaySchedule';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private daysSchedule: DaySchedule[] = [
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
  constructor() {}

  getDaysSchedule() {
    return this.daysSchedule;
  }
}
