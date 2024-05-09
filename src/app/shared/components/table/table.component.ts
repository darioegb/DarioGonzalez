import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Column, Item } from '@shared/models';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends Item> {
  @Input() columns: Column[] = [];
  @Input() items: T[] = [];

  @Output() edit: EventEmitter<T> = new EventEmitter<T>();
  @Output() remove: EventEmitter<T> = new EventEmitter<T>();

  @ViewChildren(DropdownComponent) dropdowns!: QueryList<DropdownComponent>;

  noImageSrc!: string;


  onEditItem(item: T, index: number): void {
    this.dropdowns.find((_, i) => i === index)?.toggleDropdown()
    this.edit.emit(item);
  }

  onDeleteItem(item: T, index: number): void {
    this.dropdowns.find((_, i) => i === index)?.toggleDropdown()
    this.remove.emit(item);
  }
}
