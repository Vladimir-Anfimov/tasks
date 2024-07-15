import { Injectable } from '@angular/core';
import { Day, DaySchedule } from '../types/DaySchedule';
import { Task } from '../types/Task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private daysScheduleSubject = new BehaviorSubject<DaySchedule[]>(
    Object.values(Day).map((day) => ({
      day,
      tasks: [],
    }))
  );

  subscribe(callback: (daysSchedule: DaySchedule[]) => void) {
    this.daysScheduleSubject.subscribe(callback);
  }

  private sortTasks(tasks: Task[]) {
    return tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  addTask(task: Task) {
    let _daysSchedule = this.daysScheduleSubject.value.map((daySchedule) => {
      if (daySchedule.day === task.day) {
        daySchedule.tasks.push(task);
        daySchedule.tasks = this.sortTasks(daySchedule.tasks);
      }
      return daySchedule;
    });
    this.daysScheduleSubject.next(_daysSchedule);
  }

  deleteTask(task: Task) {
    let _daysSchedule = this.daysScheduleSubject.value.map((daySchedule) => {
      if (daySchedule.day === task.day) {
        daySchedule.tasks = daySchedule.tasks.filter(
          (dayTask) => dayTask.id !== task.id
        );
      }
      return daySchedule;
    });
    this.daysScheduleSubject.next(_daysSchedule);
  }

  editTask(task: Task) {
    this.deleteTask(task);
    this.addTask(task);
  }
}
