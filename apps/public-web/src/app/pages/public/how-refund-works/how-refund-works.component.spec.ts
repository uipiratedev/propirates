import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowRefundWorksComponent } from './how-refund-works.component';

describe('HowRefundWorksComponent', () => {
  let component: HowRefundWorksComponent;
  let fixture: ComponentFixture<HowRefundWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowRefundWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowRefundWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

