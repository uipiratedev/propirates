# Shared Components

This directory contains reusable UI components that can be used throughout the application.

## Available Components

### Modal Component

A fully-featured, accessible modal/dialog component with animations and keyboard support.

**Files:**
- `modal.ts` - Main component
- `modal.html` - Template
- `modal.css` - Styles
- `modal.types.ts` - TypeScript interfaces
- `modal.service.ts` - Service for programmatic control
- `modal.spec.ts` - Unit tests
- `MODAL_GUIDE.md` - Comprehensive developer guide

**Quick Start:**

```typescript
import { Modal } from '../../../shared/components';

@Component({
  imports: [Modal],
  template: `
    <button (click)="showModal = true">Open Modal</button>
    <app-modal
      [(isOpen)]="showModal"
      title="My Modal"
      content="Hello World!"
    />
  `
})
```

**Documentation:**
See [MODAL_GUIDE.md](./MODAL_GUIDE.md) for complete documentation.

---

## Adding New Components

When adding new shared components:

1. Generate using Nx CLI:
   ```bash
   npx nx g @nx/angular:component --name=my-component --path=apps/public-web/src/app/shared/components/my-component
   ```

2. Export from `index.ts`:
   ```typescript
   export { MyComponent } from './my-component/my-component.component';
   ```

3. Document usage in this README

4. Create comprehensive tests

---

## Component Guidelines

- **Standalone**: All components should be standalone
- **Accessible**: Follow ARIA guidelines
- **Typed**: Use TypeScript interfaces for all inputs/outputs
- **Tested**: Maintain >80% test coverage
- **Documented**: Include JSDoc comments and usage examples
- **Styled**: Use Tailwind CSS for styling

---

## Import Pattern

Use the barrel export for cleaner imports:

```typescript
// ✅ Good
import { Modal, ModalService } from '../../../shared/components';

// ❌ Avoid
import { Modal } from '../../../shared/components/modal';
import { ModalService } from '../../../shared/components/modal.service';
```

