import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  studentName: string;
  usn: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  studentModel: Student = {
    studentName: '',
    usn: ''
  };

  onSubmit(): void {
    console.log('Form Submitted Data:', this.studentModel);
    alert(`Registration successful for: ${this.studentModel.studentName}`);
    this.studentModel = { studentName: '', usn: '' };
  }
}
