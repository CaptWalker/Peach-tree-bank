import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];
  constructor() { }

  private show(text: string, options: any = {}) {
    const toast = { text, ...options };
    this.toasts.push(toast);
    if(toast.delay !== undefined){
      setTimeout(()=>{
        this.remove(toast)
      }, toast.delay)
    }
  }

  showError = (text: string) => {
    this.show(text, {delay: 5000, className: 'danger'});
  }

  showSuccessMessage = (text: string) => {
    this.show(text, {className: 'success', delay: 5000});
  }

  // Callback method to remove Toast DOM element from view
  remove = (toast) => {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
