import { Day } from './DaySchedule';

export interface NewTask {
  title: string;
  startTime: Date;
  endTime: Date;
  day: Day;
}
