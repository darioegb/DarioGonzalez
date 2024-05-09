import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements AfterViewInit, OnDestroy {
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input')
  input!: ElementRef;
  private unsubscribe$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.onInput();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private onInput(): void {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        map(({ target: { value } }: any) => value),
        filter(({ length }) => length > 2 || length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        this.searchChange.emit(value);
      });
  }
}
