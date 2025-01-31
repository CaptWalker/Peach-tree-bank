import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  remove = (toast) => {
    this.toastService.remove(toast);
  }

}
