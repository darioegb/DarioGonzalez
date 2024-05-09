import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FormsModule } from '@angular/forms';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [
        FormsModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json')
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event when onNextPage is called', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 1;
    component.onNextPage();
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange event when onPrevPage is called', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 2;
    component.onPrevPage();
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should emit pageSizeChange event when onPageSizeChange is called', () => {
    spyOn(component.pageSizeChange, 'emit');
    component.pageSize = 10;
    component.onPageSizeChange();
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(10);
  });

  it('should calculate maxPageNumber correctly', () => {
    component.totalRecords = 25;
    component.pageSize = 10;
    expect(component.maxPageNumber).toEqual(3);

    component.totalRecords = 30;
    expect(component.maxPageNumber).toEqual(3);

    component.totalRecords = 0;
    expect(component.maxPageNumber).toEqual(0);
  });
});
