import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Signal li haz l-état dyal Toast (wach kayn wla la)
  toast = signal<Toast | null>(null);

  // Mthod bach t-bayyni l-message
  show(message: string, type: ToastType = 'success') {
    this.toast.set({ message, type });

    // Yghber auto mn b3d 3 thawani
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  // Method bach t-khbbih
  hide() {
    this.toast.set(null);
  }
}
