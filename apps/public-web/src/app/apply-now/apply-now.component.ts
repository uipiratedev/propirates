import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-now',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-now.component.html',
})
export class ApplyNowComponent {
  currentYear = new Date().getFullYear();
  submitted = false;

  // Stepper variables
  step = 0;
  totalSteps = 5;

  // Confirmation checkbox
  readConfirmation = false;

  // Form data
  formData: any = {
    name: '',
    location: '',
    status: '',
    workLink: '',
    hours: '',
    acceptDeadlines: '',
    goal: '',
    readyToPay: '',
    reason: '',
  };

  // Go to next step
  next(): void {
    if (this.canProceed() && this.step < this.totalSteps - 1) {
      this.step++;
      this.scrollTop();
    } else if (!this.canProceed()) {
      alert('⚠️ Please complete all required fields before proceeding.');
    }
  }

  // Go to previous step
  prev(): void {
    if (this.step > 0) {
      this.step--;
      this.scrollTop();
    }
  }

  // Validate required fields per step
  canProceed(): boolean {
    switch (this.step) {
      case 0:
        return (
          this.formData.name.trim() !== '' &&
          this.formData.location.trim() !== '' &&
          this.formData.status.trim() !== ''
        );
      case 1:
        return this.formData.workLink.trim() !== '';
      case 2:
        return this.formData.hours.trim() !== '' && this.formData.acceptDeadlines.trim() === 'Yes';
      case 3:
        return this.formData.goal.trim() !== '';
      case 4:
        return (
          this.formData.readyToPay.trim() !== '' &&
          this.formData.reason.trim() !== '' &&
          this.readConfirmation
        );
      default:
        return false;
    }
  }

  // Submit application
  submitForm(): void {
    if (!this.canProceed()) {
      alert('⚠️ Please complete all required fields before submitting.');
      return;
    }

    this.submitted = true;
    console.log('✅ Application submitted:', this.formData);
    // alert('🎉 Your application has been submitted successfully!');
  }

  // Reset form
  resetForm(): void {
    this.submitted = false;
    this.step = 0;
    this.readConfirmation = false;
    this.formData = {
      name: '',
      location: '',
      status: '',
      workLink: '',
      hours: '',
      acceptDeadlines: '',
      goal: '',
      readyToPay: '',
      reason: '',
    };
  }

  // Scroll to top on navigation
  private scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
