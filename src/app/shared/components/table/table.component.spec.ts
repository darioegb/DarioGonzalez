import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Column, Item } from '@shared/models';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TableComponent', () => {
  let component: TableComponent<Item>;
  let fixture: ComponentFixture<TableComponent<Item>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, TranslateTestingModule.withTranslations(
        'es',
        require('src/assets/i18n/es.json')
      ),],
      declarations: [TableComponent, DropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers', () => {
    component.columns = [
      { name: 'Name', key: 'name', type: 'string' },
      { name: 'Date', key: 'date', type: 'date' },
    ];
    fixture.detectChanges();
    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toBe(3); // Number of columns + extra column for dropdown
    expect(headerCells[0].nativeElement.textContent.trim()).toBe('Name');
    expect(headerCells[1].nativeElement.textContent.trim()).toBe('Date');
    // Add assertions for other headers if needed
  });

  it('should render table data', () => {
    component.columns = [
      { name: 'Name', key: 'name', type: 'string' },
      { name: 'Date', key: 'date', type: 'date' },
    ];
    component.items = [
      { name: 'Item 1', date: '2022-05-01' },
      { name: 'Item 2', date: '2022-06-01' },
    ];
    fixture.detectChanges();
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(2); // Number of items
    expect(tableRows[0].nativeElement.textContent).toContain('Item 1');
    expect(tableRows[1].nativeElement.textContent).toContain('Item 2');
    // Add assertions for other data if needed
  });

  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const mockItem = { name: 'Item 1', date: '2022-05-01' };
    component.items = [mockItem];
    fixture.detectChanges();
    const editButton = fixture.debugElement.query(
      By.css('tbody tr:first-child app-dropdown a:first-child')
    );
    editButton.triggerEventHandler('click', null);
    expect(component.edit.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should emit remove event when delete button is clicked', () => {
    spyOn(component.remove, 'emit');
    const mockItem = { name: 'Item 1', date: '2022-05-01' };
    component.items = [mockItem];
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(
      By.css('tbody tr:first-child app-dropdown a:last-child')
    );
    deleteButton.triggerEventHandler('click', null);
    expect(component.remove.emit).toHaveBeenCalledWith(mockItem);
  });
});
