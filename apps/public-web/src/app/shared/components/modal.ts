import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalConfig, ModalButton, ModalSize } from './modal.types';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  animations: [
    trigger('modalAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        })
      ),
      state(
        'enter',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('void => enter', [animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('enter => void', [animate('150ms cubic-bezier(0.4, 0, 1, 1)')]),
    ]),
    trigger('backdropAnimation', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      state(
        'enter',
        style({
          opacity: 1,
        })
      ),
      transition('void => enter', [animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('enter => void', [animate('150ms cubic-bezier(0.4, 0, 1, 1)')]),
    ]),
  ],
})
export class Modal implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalContent', { static: false }) modalContent?: ElementRef<HTMLElement>;
  @ViewChild('closeButton', { static: false }) closeButton?: ElementRef<HTMLElement>;

  /**
   * Modal title/header text
   */
  @Input() title?: string;

  /**
   * Modal body content (plain text)
   */
  @Input() content?: string;

  /**
   * Modal size
   * @default 'medium'
   */
  @Input() size: ModalSize = 'medium';

  /**
   * Whether to show the close button (X) in the header
   * @default true
   */
  @Input() showCloseButton = true;

  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  @Input() closeOnBackdropClick = true;

  /**
   * Whether pressing ESC key closes the modal
   * @default true
   */
  @Input() closeOnEscape = true;

  /**
   * Custom footer buttons
   */
  @Input() buttons?: ModalButton[];

  /**
   * Custom CSS class for the modal container
   */
  @Input() customClass?: string;

  /**
   * Custom CSS class for the modal content area
   */
  @Input() contentClass?: string;

  /**
   * ARIA label for accessibility
   */
  @Input() ariaLabel?: string;

  /**
   * ARIA described by ID for accessibility
   */
  @Input() ariaDescribedBy?: string;

  /**
   * Whether the modal is currently open
   */
  @Input() isOpen = false;

  /**
   * Event emitted when the modal is closed
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Event emitted when the modal is opened
   */
  @Output() opened = new EventEmitter<void>();

  /**
   * Event emitted when isOpen changes (for two-way binding)
   */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Animation state signal
   */
  animationState = signal<'void' | 'enter'>('void');

  /**
   * Computed modal size classes
   */
  modalSizeClass = computed(() => {
    const sizeMap: Record<ModalSize, string> = {
      small: 'max-w-md',
      medium: 'max-w-2xl',
      large: 'max-w-4xl',
      extraLarge: 'max-w-5xl',
    };
    return sizeMap[this.size];
  });

  /**
   * Default buttons if none provided
   */
  defaultButtons: ModalButton[] = [
    {
      label: 'Close',
      variant: 'secondary',
      onClick: () => this.close(),
    },
  ];

  private previousActiveElement?: HTMLElement;
  private focusTrapElements: HTMLElement[] = [];

  ngOnInit(): void {
    if (this.isOpen) {
      this.open();
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.setupFocusTrap();
      this.focusFirstElement();
    }
  }

  ngOnDestroy(): void {
    this.restoreFocus();
    this.enableBodyScroll();
  }

  /**
   * Opens the modal
   */
  open(): void {
    this.isOpen = true;
    this.isOpenChange.emit(true);
    this.animationState.set('enter');
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.disableBodyScroll();
    this.opened.emit();

    // Setup focus trap after animation
    setTimeout(() => {
      this.setupFocusTrap();
      this.focusFirstElement();
    }, 100);
  }

  /**
   * Closes the modal
   */
  close(): void {
    this.animationState.set('void');
    setTimeout(() => {
      this.isOpen = false;
      this.isOpenChange.emit(false);
      this.restoreFocus();
      this.enableBodyScroll();
      this.closed.emit();
    }, 150);
  }

  /**
   * Handles backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * Handles ESC key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.closeOnEscape && this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Handles button click
   */
  async onButtonClick(button: ModalButton): Promise<void> {
    if (button.disabled) {
      return;
    }

    let shouldClose = button.closeOnClick !== false;

    if (button.onClick) {
      const result = await button.onClick();
      if (result === false) {
        shouldClose = false;
      }
    }

    if (shouldClose) {
      this.close();
    }
  }

  /**
   * Gets button CSS classes
   */
  getButtonClass(button: ModalButton): string {
    const baseClasses =
      'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses: Record<string, string> = {
      primary: 'bg-primary hover:bg-emerald-700 text-white focus:ring-primary',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400',
    };

    const variantClass = variantClasses[button.variant || 'secondary'];
    const disabledClass = button.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${variantClass} ${disabledClass} ${button.customClass || ''}`.trim();
  }

  /**
   * Sets up focus trap for accessibility
   */
  private setupFocusTrap(): void {
    if (!this.modalContent) return;

    const focusableElements = this.modalContent.nativeElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    this.focusTrapElements = Array.from(focusableElements);
  }

  /**
   * Focuses the first focusable element
   */
  private focusFirstElement(): void {
    if (this.closeButton?.nativeElement) {
      this.closeButton.nativeElement.focus();
    } else if (this.focusTrapElements.length > 0) {
      this.focusTrapElements[0].focus();
    }
  }

  /**
   * Restores focus to the previously focused element
   */
  private restoreFocus(): void {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Disables body scroll when modal is open
   */
  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Enables body scroll when modal is closed
   */
  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }

  /**
   * Gets the buttons to display
   */
  get displayButtons(): ModalButton[] {
    return this.buttons && this.buttons.length > 0 ? this.buttons : this.defaultButtons;
  }

  /**
   * Checks if there is projected content
   */
  hasProjectedContent(): boolean {
    const ngContent = this.modalContent?.nativeElement.querySelector('ng-content');
    return ngContent ? ngContent.childNodes.length > 0 : false;
  }
}
