import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal } from './modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalButton } from './modal.types';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible by default', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should open when isOpen is set to true', () => {
    component.isOpen = true;
    component.open();
    expect(component.isOpen).toBe(true);
    expect(component.animationState()).toBe('enter');
  });

  it('should close when close() is called', (done) => {
    component.isOpen = true;
    component.open();

    component.close();

    // Animation takes 150ms
    setTimeout(() => {
      expect(component.isOpen).toBe(false);
      done();
    }, 200);
  });

  it('should emit opened event when opened', (done) => {
    component.opened.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    component.open();
  });

  it('should emit closed event when closed', (done) => {
    component.isOpen = true;
    component.open();

    component.closed.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    component.close();
  });

  it('should display title when provided', () => {
    component.title = 'Test Title';
    component.isOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('#modal-title');
    expect(titleElement?.textContent?.trim()).toBe('Test Title');
  });

  it('should display content when provided', () => {
    component.content = 'Test Content';
    component.isOpen = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Content');
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    expect(component.modalSizeClass()).toBe('max-w-4xl');

    component.size = 'medium';
    expect(component.modalSizeClass()).toBe('max-w-2xl');

    component.size = 'small';
    expect(component.modalSizeClass()).toBe('max-w-md');
  });

  it('should show close button by default', () => {
    component.isOpen = true;
    component.title = 'Test';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const closeButton = compiled.querySelector('[aria-label="Close modal"]');
    expect(closeButton).toBeTruthy();
  });

  it('should hide close button when showCloseButton is false', () => {
    component.isOpen = true;
    component.title = 'Test';
    component.showCloseButton = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const closeButton = compiled.querySelector('[aria-label="Close modal"]');
    expect(closeButton).toBeFalsy();
  });

  it('should display default close button when no buttons provided', () => {
    component.isOpen = true;
    fixture.detectChanges();

    expect(component.displayButtons.length).toBe(1);
    expect(component.displayButtons[0].label).toBe('Close');
  });

  it('should display custom buttons when provided', () => {
    const customButtons: ModalButton[] = [
      { label: 'Cancel', variant: 'secondary' },
      { label: 'Confirm', variant: 'primary' },
    ];

    component.buttons = customButtons;
    component.isOpen = true;
    fixture.detectChanges();

    expect(component.displayButtons.length).toBe(2);
    expect(component.displayButtons[0].label).toBe('Cancel');
    expect(component.displayButtons[1].label).toBe('Confirm');
  });

  it('should call button onClick handler when clicked', async () => {
    let clicked = false;
    const button: ModalButton = {
      label: 'Test',
      onClick: () => {
        clicked = true;
      },
    };

    await component.onButtonClick(button);
    expect(clicked).toBe(true);
  });

  it('should not close modal when button onClick returns false', async () => {
    component.isOpen = true;
    const button: ModalButton = {
      label: 'Test',
      onClick: () => false,
    };

    await component.onButtonClick(button);

    // Wait for potential close animation
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(component.isOpen).toBe(true);
  });

  it('should apply correct button variant classes', () => {
    const primaryButton: ModalButton = { label: 'Primary', variant: 'primary' };
    const secondaryButton: ModalButton = { label: 'Secondary', variant: 'secondary' };
    const dangerButton: ModalButton = { label: 'Danger', variant: 'danger' };

    expect(component.getButtonClass(primaryButton)).toContain('bg-primary');
    expect(component.getButtonClass(secondaryButton)).toContain('bg-gray-200');
    expect(component.getButtonClass(dangerButton)).toContain('bg-red-600');
  });

  it('should disable body scroll when opened', () => {
    component.open();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should enable body scroll when closed', (done) => {
    component.open();
    component.close();

    setTimeout(() => {
      expect(document.body.style.overflow).toBe('');
      done();
    }, 200);
  });

  it('should close on backdrop click when enabled', () => {
    component.isOpen = true;
    component.closeOnBackdropClick = true;

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: event.currentTarget, enumerable: true });

    component.onBackdropClick(event);

    expect(component.animationState()).toBe('void');
  });

  it('should not close on backdrop click when disabled', () => {
    component.isOpen = true;
    component.closeOnBackdropClick = false;

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: event.currentTarget, enumerable: true });

    component.onBackdropClick(event);

    expect(component.isOpen).toBe(true);
  });
});
