import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { Subject } from 'rxjs';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term on input change', () => {
    const searchTerm = 'test';
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    spyOn(component.searchChange, 'emit');

    inputElement.value = searchTerm;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.searchChange.emit).toHaveBeenCalledWith(searchTerm);
  });

  it('should not emit search term if input length is less than 3', () => {
    const searchTerm = 'te';
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    spyOn(component.searchChange, 'emit');

    inputElement.value = searchTerm;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.searchChange.emit).not.toHaveBeenCalled();
  });
});
