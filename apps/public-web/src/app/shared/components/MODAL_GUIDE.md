# Modal Component - Developer Guide

## Overview

The Modal component is a reusable, accessible, and highly configurable dialog component built with Angular 20. It provides a flexible way to display content in an overlay with support for custom templates, animations, keyboard navigation, and focus management.

## Features

- ✅ **Fully Accessible**: ARIA labels, keyboard navigation, focus trap
- ✅ **Customizable**: Multiple size options, custom buttons, and styling
- ✅ **Animations**: Smooth open/close transitions
- ✅ **Content Projection**: Support for both simple text and complex templates
- ✅ **Programmatic API**: Service-based modal creation
- ✅ **Keyboard Support**: ESC to close, focus management
- ✅ **Backdrop Control**: Configurable backdrop click behavior
- ✅ **TypeScript**: Fully typed interfaces and configurations

---

## Installation & Import

### Import the Component

```typescript
import { Modal } from '../../../shared/components/modal';
import { ModalConfig, ModalButton } from '../../../shared/components/modal.types';
```

### Import the Service (Optional)

```typescript
import { ModalService } from '../../../shared/components/modal.service';
```

---

## API Documentation

### Component Inputs

| Input                  | Type                             | Default     | Description                                                            |
| ---------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `isOpen`               | `boolean`                        | `false`     | Controls modal visibility (supports two-way binding with `[(isOpen)]`) |
| `title`                | `string`                         | `undefined` | Modal title/header text                                                |
| `content`              | `string`                         | `undefined` | Modal body content (plain text)                                        |
| `size`                 | `'small' \| 'medium' \| 'large'` | `'medium'`  | Modal size                                                             |
| `showCloseButton`      | `boolean`                        | `true`      | Whether to show the close button (X) in header                         |
| `closeOnBackdropClick` | `boolean`                        | `true`      | Whether clicking backdrop closes the modal                             |
| `closeOnEscape`        | `boolean`                        | `true`      | Whether pressing ESC closes the modal                                  |
| `buttons`              | `ModalButton[]`                  | `undefined` | Custom footer buttons                                                  |
| `customClass`          | `string`                         | `undefined` | Custom CSS class for modal container                                   |
| `contentClass`         | `string`                         | `undefined` | Custom CSS class for modal content area                                |
| `ariaLabel`            | `string`                         | `undefined` | ARIA label for accessibility                                           |
| `ariaDescribedBy`      | `string`                         | `undefined` | ARIA described by ID                                                   |

### Component Outputs

| Output   | Type                 | Description                      |
| -------- | -------------------- | -------------------------------- |
| `closed` | `EventEmitter<void>` | Emitted when the modal is closed |
| `opened` | `EventEmitter<void>` | Emitted when the modal is opened |

### Component Methods

| Method    | Parameters | Returns | Description      |
| --------- | ---------- | ------- | ---------------- |
| `open()`  | none       | `void`  | Opens the modal  |
| `close()` | none       | `void`  | Closes the modal |

### ModalButton Interface

```typescript
interface ModalButton {
  label: string; // Button label text
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; // Button style
  onClick?: () => boolean | void | Promise<boolean | void>; // Click handler
  disabled?: boolean; // Whether button is disabled
  customClass?: string; // Custom CSS classes
  closeOnClick?: boolean; // Whether to close modal on click (default: true)
}
```

### ModalConfig Interface

```typescript
interface ModalConfig {
  title?: string;
  content?: string;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  buttons?: ModalButton[];
  customClass?: string;
  contentClass?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

---

## Usage Examples

### Example 1: Basic Modal with Simple Text

```typescript
import { Component } from '@angular/core';
import { Modal } from '../../../shared/components/modal';

@Component({
  selector: 'app-my-page',
  imports: [Modal],
  template: `
    <button (click)="showModal = true" class="bg-btn">Open Modal</button>

    <app-modal
      [(isOpen)]="showModal"
      title="Welcome"
      content="This is a simple modal with text content."
      size="medium"
      (closed)="onModalClosed()"
    />
  `,
})
export class MyPageComponent {
  showModal = false;

  onModalClosed() {
    console.log('Modal was closed');
  }
}
```

### Example 2: Modal with Custom Template Content

```typescript
import { Component } from '@angular/core';
import { Modal } from '../../../shared/components/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-page',
  imports: [Modal, CommonModule],
  template: `
    <button (click)="showModal = true" class="bg-btn">Open Form Modal</button>

    <app-modal [(isOpen)]="showModal" title="User Registration" size="large">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            [(ngModel)]="userName"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            [(ngModel)]="userEmail"
          />
        </div>
      </form>
    </app-modal>
  `,
})
export class MyPageComponent {
  showModal = false;
  userName = '';
  userEmail = '';
}
```

### Example 3: Modal with Custom Footer Buttons

```typescript
import { Component } from '@angular/core';
import { Modal } from '../../../shared/components/modal';
import { ModalButton } from '../../../shared/components/modal.types';

@Component({
  selector: 'app-my-page',
  imports: [Modal],
  template: `
    <button (click)="showConfirmModal = true" class="bg-btn">Delete Item</button>

    <app-modal
      [(isOpen)]="showConfirmModal"
      title="Confirm Deletion"
      content="Are you sure you want to delete this item? This action cannot be undone."
      size="small"
      [buttons]="confirmButtons"
    />
  `,
})
export class MyPageComponent {
  showConfirmModal = false;

  confirmButtons: ModalButton[] = [
    {
      label: 'Cancel',
      variant: 'ghost',
      onClick: () => {
        console.log('Cancelled');
      },
    },
    {
      label: 'Delete',
      variant: 'danger',
      onClick: () => {
        this.deleteItem();
      },
    },
  ];

  deleteItem() {
    console.log('Item deleted');
    // Perform deletion logic
  }
}
```

### Example 4: Different Size Configurations

```typescript
import { Component } from '@angular/core';
import { Modal } from '../../../shared/components/modal';

@Component({
  selector: 'app-my-page',
  imports: [Modal],
  template: `
    <div class="space-x-4">
      <button (click)="showSmall = true" class="bg-btn">Small Modal</button>
      <button (click)="showMedium = true" class="bg-btn">Medium Modal</button>
      <button (click)="showLarge = true" class="bg-btn">Large Modal</button>
    </div>

    <app-modal
      [(isOpen)]="showSmall"
      title="Small Modal"
      content="This is a small modal."
      size="small"
    />

    <app-modal
      [(isOpen)]="showMedium"
      title="Medium Modal"
      content="This is a medium modal."
      size="medium"
    />

    <app-modal
      [(isOpen)]="showLarge"
      title="Large Modal"
      content="This is a large modal with more space for content."
      size="large"
    />
  `,
})
export class MyPageComponent {
  showSmall = false;
  showMedium = false;
  showLarge = false;
}
```

### Example 5: Using ModalService for Programmatic Control

```typescript
import { Component, inject } from '@angular/core';
import { ModalService } from '../../../shared/components/modal.service';

@Component({
  selector: 'app-my-page',
  template: ` <button (click)="openDynamicModal()" class="bg-btn">Open Dynamic Modal</button> `,
})
export class MyPageComponent {
  private modalService = inject(ModalService);

  openDynamicModal() {
    const modalRef = this.modalService.open({
      title: 'Dynamic Modal',
      content: 'This modal was created programmatically!',
      size: 'medium',
      buttons: [
        {
          label: 'Got it',
          variant: 'primary',
        },
      ],
    });

    // You can interact with the modal instance
    modalRef.instance.closed.subscribe(() => {
      console.log('Dynamic modal closed');
    });
  }
}
```

### Example 6: Async Button Actions

```typescript
import { Component } from '@angular/core';
import { Modal } from '../../../shared/components/modal';
import { ModalButton } from '../../../shared/components/modal.types';

@Component({
  selector: 'app-my-page',
  imports: [Modal],
  template: `
    <button (click)="showSaveModal = true" class="bg-btn">Save Changes</button>

    <app-modal
      [(isOpen)]="showSaveModal"
      title="Save Changes"
      content="Do you want to save your changes?"
      [buttons]="saveButtons"
    />
  `,
})
export class MyPageComponent {
  showSaveModal = false;

  saveButtons: ModalButton[] = [
    {
      label: 'Cancel',
      variant: 'ghost',
    },
    {
      label: 'Save',
      variant: 'primary',
      onClick: async () => {
        // Perform async operation
        await this.saveChanges();
        // Return false to prevent modal from closing if save failed
        return this.saveSuccess;
      },
    },
  ];

  saveSuccess = true;

  async saveChanges(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Changes saved');
  }
}
```

---

## Styling Customization

### Size Classes

The modal comes with three predefined sizes:

- **Small**: `max-w-md` (28rem / 448px)
- **Medium**: `max-w-2xl` (42rem / 672px)
- **Large**: `max-w-4xl` (56rem / 896px)

### Custom Styling

You can customize the modal appearance using the `customClass` and `contentClass` inputs:

```html
<app-modal
  [(isOpen)]="showModal"
  title="Custom Styled Modal"
  customClass="shadow-2xl border-4 border-primary"
  contentClass="bg-gray-50 p-8"
>
  <!-- Your content -->
</app-modal>
```

### Button Variants

Available button variants:

- **primary**: Green background (uses theme primary color)
- **secondary**: Gray background
- **danger**: Red background
- **ghost**: Transparent background

---

## Accessibility Features

### ARIA Support

The modal component includes comprehensive ARIA support:

- `role="dialog"`
- `aria-modal="true"`
- `aria-label` (configurable)
- `aria-describedby` (configurable)

### Keyboard Navigation

- **ESC**: Closes the modal (configurable)
- **Tab**: Cycles through focusable elements within the modal
- **Focus Trap**: Focus is trapped within the modal when open

### Focus Management

- Automatically focuses the first focusable element when opened
- Restores focus to the previously focused element when closed
- Prevents body scroll when modal is open

---

## Best Practices

1. **Always provide a title** for better accessibility
2. **Use appropriate size** based on content amount
3. **Provide clear button labels** that describe the action
4. **Handle async operations** in button onClick handlers
5. **Use content projection** for complex layouts
6. **Test keyboard navigation** to ensure accessibility
7. **Avoid nesting modals** - close one before opening another
8. **Provide feedback** for async operations (loading states)

---

## Common Use Cases

### Confirmation Dialogs

Use small modals with danger buttons for destructive actions.

### Forms

Use medium or large modals with custom content projection.

### Information Display

Use medium modals with simple text content.

### Multi-step Wizards

Use large modals with custom content and navigation buttons.

---

## Troubleshooting

### Modal not appearing

- Ensure `isOpen` is set to `true`
- Check z-index conflicts with other elements

### Backdrop click not working

- Verify `closeOnBackdropClick` is not set to `false`

### Animations not smooth

- Ensure Angular animations are properly imported
- Check for CSS conflicts

### Focus not trapped

- Verify modal content has focusable elements
- Check for conflicting focus management code

---

## Support

For issues or questions, please refer to the project's main documentation or contact the development team.
