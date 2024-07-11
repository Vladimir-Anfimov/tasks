import { Task } from './Task';

export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface DaySchedule {
  day: Day;
  tasks: Task[];
}
