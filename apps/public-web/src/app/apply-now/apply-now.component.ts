import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-now',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-now.component.html',
})
export class ApplyNowComponent {
  currentYear = new Date().getFullYear();
  submitted = false;

  formData = {
    name: '',
    email: '',
    experience: '',
    portfolio: '',
    goal: '',
  };

  submitForm() {
    this.submitted = true;
    console.log('Application submitted:', this.formData);
  }
}
