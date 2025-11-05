import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-application.component.html',
})
export class StartApplicationComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  startNow() {
    // Navigate to the Apply Now page
    this.router.navigate(['/apply-now']);
  }
}
