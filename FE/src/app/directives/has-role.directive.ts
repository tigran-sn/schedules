import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../services';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input({ required: true }) hasRole!: number | number[];

  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  private hasView = signal(false);

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        const userRole = user?.user_role ?? null;
        const canView = this.matchesRole(userRole);

        if (canView !== this.hasView()) {
          if (canView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
          this.hasView.set(canView);
        }
      });
  }

  private matchesRole(userRole: number | null): boolean {
    if (!userRole) return false;

    return Array.isArray(this.hasRole)
      ? this.hasRole.includes(userRole)
      : this.hasRole === userRole;
  }
}
