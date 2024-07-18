import { Injectable } from '@angular/core';
import { Day, DaySchedule } from '../types/DaySchedule';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../types/Task';
import { HttpClient } from '@angular/common/http';
import { NewTask } from '../types/NewTask';

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

  constructor(private http: HttpClient) {
    this.loadSchedule();
  }

  loadSchedule() {
    this.http
      .get<Task[]>(`${environment.apiUrl}/activities`)
      .subscribe((tasks: Task[]) => {
        let _daysSchedule = Object.values(Day).map((day) => ({
          day,
          tasks: tasks.filter((task) => task.day === day),
        }));
        this.daysScheduleSubject.next(_daysSchedule);
      });
  }

  get daysSchedule() {
    return this.daysScheduleSubject.asObservable();
  }

  addTask(task: NewTask) {
    const [hoursStart, minutesStart] = task.startTime
      .toString()
      .split(':')
      .map(Number);
    const [hoursEnd, minutesEnd] = task.endTime
      .toString()
      .split(':')
      .map(Number);

    task.startTime = new Date(0, 0, 0, hoursStart, minutesStart);
    task.endTime = new Date(0, 0, 0, hoursEnd, minutesEnd);

    this.http
      .post<Task>(`${environment.apiUrl}/activities`, task)
      .subscribe((task) => {
        this.addTaskToState(task);
      });
  }

  private addTaskToState(task: Task) {
    let _daysSchedule = this.daysScheduleSubject.value.map((daySchedule) => {
      if (daySchedule.day === task.day) {
        daySchedule.tasks.push(task);
      }
      return daySchedule;
    });
    this.daysScheduleSubject.next(_daysSchedule);
  }

  deleteTask(task: Task) {
    this.http
      .delete<Task>(`${environment.apiUrl}/activities/${task.id}`)
      .subscribe(() => {
        this.deleteTaskFromState(task);
      });
  }

  private deleteTaskFromState(task: Task) {
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
    this.http
      .post<Task>(`${environment.apiUrl}/activities/${task.id}`, task)
      .subscribe((task) => {
        this.editTaskInState(task);
      });
  }

  private editTaskInState(task: Task) {
    this.deleteTaskFromState(task);
    this.addTaskToState(task);
  }
}
