import { Injectable } from '@angular/core';
import { Day, DaySchedule } from '../types/DaySchedule';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private daysSchedule: DaySchedule[] = [
    {
      day: Day.Monday,
      tasks: [
        {
          title: 'Task 1',
          startTime: new Date('2021-09-20T10:00:00'),
          endTime: new Date('2021-09-20T11:00:00'),
        },
        {
          title: 'Task 2',
          startTime: new Date('2021-09-20T12:00:00'),
          endTime: new Date('2021-09-20T13:00:00'),
        },
      ],
    },
    {
      day: Day.Tuesday,
      tasks: [
        {
          title: 'Task 3',
          startTime: new Date('2021-09-21T10:00:00'),
          endTime: new Date('2021-09-21T11:00:00'),
        },
        {
          title: 'Task 4',
          startTime: new Date('2021-09-21T12:00:00'),
          endTime: new Date('2021-09-21T13:00:00'),
        },
      ],
    },
    {
      day: Day.Wednesday,
      tasks: [
        {
          title: 'Task 5',
          startTime: new Date('2021-09-22T10:00:00'),
          endTime: new Date('2021-09-22T11:00:00'),
        },
        {
          title: 'Task 6',
          startTime: new Date('2021-09-22T12:00:00'),
          endTime: new Date('2021-09-22T13:00:00'),
        },
      ],
    },
    {
      day: Day.Thursday,
      tasks: [],
    },
    {
      day: Day.Friday,
      tasks: [],
    },
    {
      day: Day.Saturday,
      tasks: [],
    },
    {
      day: Day.Sunday,
      tasks: [],
    },
  ];
  constructor() {}

  getDaysSchedule() {
    return this.daysSchedule;
  }
}
