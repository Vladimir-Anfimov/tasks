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

  get daysSchedule() {
    console.log('got daysSchedule');
    return this.daysScheduleSubject.asObservable();
  }

  addTask(task: Task) {
    let _daysSchedule = this.daysScheduleSubject.value.map((daySchedule) => {
      if (daySchedule.day === task.day) {
        console.log('addTask');
        daySchedule.tasks.push(task);
      }
      return daySchedule;
    });
    this.daysScheduleSubject.next(_daysSchedule);
  }

  deleteTask(task: Task) {
    let _daysSchedule = this.daysScheduleSubject.value.map((daySchedule) => {
      if (daySchedule.day === task.day) {
        console.log('deleteTask');
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
