import { Task } from './Task';

type Day =
  | 'Luni'
  | 'Marti'
  | 'Miercuri'
  | 'Joi'
  | 'Vineri'
  | 'Sambata'
  | 'Duminica';

export interface DaySchedule {
  day: Day;
  tasks: Task[];
}
