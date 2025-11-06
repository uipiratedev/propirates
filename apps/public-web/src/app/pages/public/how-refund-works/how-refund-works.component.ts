import { Component } from '@angular/core';

@Component({
  selector: 'app-how-refund-works',
  imports: [],
  templateUrl: './how-refund-works.component.html',
  styleUrl: './how-refund-works.component.css',
})
export class HowRefundWorksComponent {
  readonly currentYear = new Date().getFullYear();
  readonly faqs = [
    {
      q: 'What if I am already working?',
      a: 'Perfect. Ship a freelance task, internal delivery, or get a new role — refund applies as per ladder.',
    },
    {
      q: 'I’m a student. Can I afford this?',
      a: 'Yes. Top applicants earn 30–50% scholarship. And if you land a paid internship or gig within 60 days, you earn the fee back.',
    },
    {
      q: 'Why charge a fee at all?',
      a: 'Free things are ignored. This is a commitment fee. It makes people show up, finish, and perform like professionals.',
    },
    {
      q: 'Is this guaranteed?',
      a: 'No. Real world isn’t guaranteed. We select for hunger and discipline, then coach you to deliver.',
    },
    {
      q: 'What kills my refund eligibility?',
      a: 'Plagiarism, disappearing, quitting, or missing deadlines without communication.',
    },
  ];
}
