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
  totalSteps = 3;

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
        return this.formData.name.trim() !== '' && this.formData.location.trim() !== '';
      case 1:
        // return this.formData.workLink.trim() !== '';
        return true;
      case 2:
        // return this.formData.hours.trim() !== '' && this.formData.acceptDeadlines.trim() === 'Yes';
        return true;
      // case 3:
      //   return this.formData.goal.trim() !== '';
      // case 4:
      //   return (
      //     this.formData.readyToPay.trim() !== '' &&
      //     this.formData.reason.trim() !== '' &&
      //     this.readConfirmation
      //   );
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

  ngAfterViewInit() {
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('.otp-box'));

    inputs.forEach((input, index) => {
      // When typing → move next + replace current
      input.addEventListener('input', (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // allow only numbers
        e.target.value = value;

        if (value && index < inputs.length - 1) {
          inputs[index + 1].focus();
          inputs[index + 1].select(); // highlight next input
        }
      });

      // Backspace → go to previous box
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = ''; // remove previous
          } else {
            input.value = ''; // remove current
          }
        }
      });

      // On focus → highlight current
      input.addEventListener('focus', () => {
        input.select();
      });
    });
  }

  links: any[] = [
    { type: 'facebook', icon: '🌐', value: 'fb.com/uipirates' },
    { type: 'behance', icon: '🎨', value: 'x.com/uipirates' },
  ];

  availableLinks = [
    { type: 'facebook', icon: '🌐', placeholder: 'facebook.com/yourid' },
    { type: 'behance', icon: '🎨', placeholder: 'behance.net/yourid' },
    { type: 'linkedin', icon: '💼', placeholder: 'linkedin.com/in/yourid' },
    { type: 'instagram', icon: '📸', placeholder: 'instagram.com/yourid' },
    { type: 'dribbble', icon: '🏀', placeholder: 'dribbble.com/yourid' },
  ];

  dropdownOpen = false;

  addLink(option: any) {
    this.links.unshift({
      type: option.type,
      icon: option.icon,
      value: '',
    });
    this.dropdownOpen = false;
  }

  removeLink(index: number) {
    this.links.splice(index, 1);
  }
}
