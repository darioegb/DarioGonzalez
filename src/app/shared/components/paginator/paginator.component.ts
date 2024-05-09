import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  pageSizeOptions: number[] = [5, 10, 20];

  get maxPageNumber(): number {
    return Math.ceil(this.totalRecords/this.pageSize);
  }

  onPageSizeChange(): void {
    this.pageSizeChange.emit(this.pageSize);
  }

  onPrevPage(): void {
    this.pageChange.emit(this.currentPage -1);
  }

  onNextPage(): void {
    this.pageChange.emit(this.currentPage + 1);
  }
}
