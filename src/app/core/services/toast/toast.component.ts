import { Component, inject, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="toastService.toast() as toast">
      <div
        class="fixed left-1/2 transform -translate-x-1/2 z-[99999] w-full max-w-md px-4 pointer-events-none flex justify-center"
        style="top: 1.5rem; z-index: 99999;"
      >
        <div
          class="pointer-events-auto flex items-center p-4 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-slide-down w-full"
          [ngClass]="{
            'bg-green-50/90 border-green-200 text-green-900': toast.type === 'success',
            'bg-red-50/90 border-red-200 text-red-900': toast.type === 'error'
          }"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mr-4">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
              [ngClass]="{
                'bg-green-100 text-green-600': toast.type === 'success',
                'bg-red-100 text-red-600': toast.type === 'error'
              }"
            >
              <svg *ngIf="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg *ngIf="toast.type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-sm tracking-wide uppercase opacity-90">
              {{ toast.type === 'success' ? 'Succès' : 'Erreur' }}
            </h4>
            <p class="text-sm font-medium mt-0.5 opacity-90 break-words leading-snug">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            type="button"
            (click)="toastService.hide()"
            aria-label="Fermer"
            class="ml-4 p-1 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
            [ngClass]="{
              'text-green-800': toast.type === 'success',
              'text-red-800': toast.type === 'error'
            }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    @keyframes slide-down {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .animate-slide-down {
      animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toastService = inject(ToastService);
  private readonly elRef = inject(ElementRef);
  private moved = false;

  ngOnInit(): void {
    // Déplacer l'élément hôte dans #toast-root si présent sinon document.body
    try {
      const host = this.elRef.nativeElement as HTMLElement;
      const root = document.getElementById('toast-root');
      const target = root ?? document.body;
      if (host && host.parentElement !== target) {
        target.appendChild(host);
        this.moved = true;
      }
    } catch (e) {
      // ignore
    }
  }

  ngOnDestroy(): void {
    if (this.moved) {
      try {
        const host = this.elRef.nativeElement as HTMLElement;
        const root = document.getElementById('toast-root');
        const target = root ?? document.body;
        if (host && host.parentElement === target) {
          target.removeChild(host);
        }
      } catch (e) {
        // ignore
      }
    }
  }
}
