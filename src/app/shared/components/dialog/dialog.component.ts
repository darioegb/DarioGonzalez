import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Output() dialogClosed = new EventEmitter<boolean>();
  message!: string;

  confirm(confirm: boolean) {
    this.dialogClosed.emit(confirm);
  }
}
