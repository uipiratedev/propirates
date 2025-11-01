import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  readonly APPLY_LINK = 'https://forms.gle/your-form-id'; // Replace with your Google Form URL
  readonly START_DATE = 'Starts Nov 15'; // Update as needed
  readonly PRICE = '$199'; // Update if needed
  readonly currentYear = new Date().getFullYear();

  readonly whatYouWillDo = [
    {
      title: 'Build a complete SaaS product',
      desc: 'Brief → research → flows → wireframes → system → UI → prototype. Learn to think and deliver like a product designer.',
    },
    {
      title: 'Redesign an enterprise app',
      desc: 'Choose a real, widely-used product. Identify UX problems, propose improvements, and ship a defensible redesign.',
    },
    {
      title: 'Make a portfolio that looks experienced',
      desc: 'Case studies that read like real work. No Dribbble fluff. Show decisions, constraints, and outcomes.',
    },
  ];

  readonly refundPolicy = [
    {
      title: '15–20 days',
      desc: 'Job offer or paid client in 15–20 days post-program → 100% refund.',
      highlight: '100% refund',
    },
    {
      title: '30–45 days',
      desc: 'Job/client within 30–45 days → 100% refund.',
      highlight: '100% refund',
    },
    {
      title: 'Up to 60 days',
      desc: 'Success within 60 days → 100% refund. After 60 days, refunds aren\'t guaranteed, but support continues.',
      highlight: '100% refund',
    },
  ];

  readonly faqs = [
    {
      q: 'Is this beginner-friendly?',
      a: 'Yes, if you\'re serious. You must show any attempt at work and commit ≥6 hours/week.',
    },
    {
      q: 'Are there recordings?',
      a: 'No. It\'s live/async, feedback-first. You learn by shipping.',
    },
    {
      q: 'Do you guarantee jobs?',
      a: 'No. We guarantee standards, mentorship, and a portfolio that earns respect. Refunds are performance-based.',
    },
    {
      q: 'How do I start?',
      a: 'Apply → complete 48-hour task → if accepted, we start immediately (even with a batch of 1).',
    },
  ];
}

