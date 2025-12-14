import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { Task } from './model/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(
      this.newTaskTitle,
      this.newTaskDescription
    ).subscribe(task => {
      this.tasks.push(task);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
}
