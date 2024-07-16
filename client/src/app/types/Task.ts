import { Day } from './DaySchedule';

export interface Task {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  day: Day;
}
