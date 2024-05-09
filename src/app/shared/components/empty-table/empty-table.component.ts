import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table',
  templateUrl: './empty-table.component.html',
  styleUrl: './empty-table.component.scss'
})
export class EmptyTableComponent {
  @Input() message: string = 'No items to display';
}
