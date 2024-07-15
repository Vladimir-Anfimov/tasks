import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { TasksService } from '../tasks-service';
import { Day } from '../../types/DaySchedule';
import { CommonModule } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { Task } from '../../types/Task';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatButtonModule,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOption,
    CommonModule,
    ReactiveFormsModule,
    MatSelect,
  ],
  templateUrl: './add-or-edit-task-dialog.component.html',
  styleUrl: './add-or-edit-task-dialog.component.scss',
})
export class AddOrEditTaskDialogComponent {
  public readonly AllDays = Object.values(Day);
  private editedTaskId: string | null = null;
  public taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    day: [Day.Monday, Validators.required],
    startTime: this.formBuilder.control<Date | null>(null, Validators.required),
    endTime: this.formBuilder.control<Date | null>(null, Validators.required),
  });

  public isEdit(): boolean {
    return this.editedTaskId !== null;
  }

  constructor(
    private dialogRef: MatDialogRef<AddOrEditTaskDialogComponent>,
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {
    this.editedTaskId = data?.id || null;
    if (data) {
      this.taskForm.setValue({
        title: data.title,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  manageTask() {
    if (this.isEdit()) {
      this.editTask();
    } else {
      this.addTask();
    }
  }
  editTask() {
    if (!this.taskForm.valid) {
      return;
    }

    const { title, day, startTime, endTime } = this.taskForm.controls;

    if (!startTime.value || !endTime.value || !this.editedTaskId) {
      return;
    }

    const task: Task = {
      id: this.editedTaskId,
      title: title.value,
      startTime: startTime.value,
      endTime: endTime.value,
      day: day.value,
    };

    this.tasksService.editTask(task);
  }

  addTask(): void {
    if (!this.taskForm.valid) {
      return;
    }

    const { title, day, startTime, endTime } = this.taskForm.controls;

    if (!startTime.value || !endTime.value) {
      return;
    }

    const task: Task = {
      id: Math.random().toString(36),
      title: title.value,
      startTime: startTime.value,
      endTime: endTime.value,
      day: day.value,
    };

    this.tasksService.addTask(task);
    this.dialogRef.close();
  }
}
