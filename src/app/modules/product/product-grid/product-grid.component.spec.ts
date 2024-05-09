import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridComponent } from './product-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@root/app/shared/components/dialog/dialog.service';
import { of } from 'rxjs';
import { ProductService } from '../shared';
import { SharedModule } from '@shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ProductGridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, TranslateTestingModule.withTranslations(
        'es',
        require('src/assets/i18n/es.json')
      ),],
      declarations: [ProductGridComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () => of([]),
            delete: () => of({}),
          },
        },
        {
          provide: DialogService,
          useValue: {
            showDialog: () => ({ instance: { dialogClosed: of(true) } }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on initialization', () => {
    spyOn(component, 'loadData');
    component.ngOnInit();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should update search term and load data on search change', () => {
    spyOn(component, 'loadData');
    component.onSearchChange('test');
    expect(component.searchTerm).toEqual('test');
    expect(component.currentPage).toEqual(1);
    expect(component.loadData).toHaveBeenCalledWith(true);
  });

  it('should update page size and reset current page on page size change', () => {
    component.currentPage = 2;
    component.onPageSizeChange(10);
    expect(component.pageSize).toEqual(10);
    expect(component.currentPage).toEqual(1);
  });

  it('should update current page on page change', () => {
    component.onPageChange(3);
    expect(component.currentPage).toEqual(3);
  });

  it('should navigate to add page on add', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onAdd();
    expect(routerSpy).toHaveBeenCalledWith(['detail'], {
      relativeTo: component['route'],
    });
  });

  it('should navigate to edit page with correct state on edit item', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const product = { id: 1 } as any;
    component.onEditItem(product);
    expect(routerSpy).toHaveBeenCalledWith([`detail/${product.id}`], {
      state: { data: { product } },
      relativeTo: component['route'],
    });
  });

  it('should show confirmation dialog on delete item and delete if confirmed', () => {
    const dialogSpy = spyOn(
      component['dialogService'],
      'showDialog'
    ).and.returnValue({
      instance: { dialogClosed: of(true) },
    } as any);
    const deleteSpy = spyOn(
      component['productService'],
      'delete'
    ).and.returnValue(of({}));
    const product = { id: 1 } as any;
    component.onDeleteItem(product);
    expect(dialogSpy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalledWith(product.id);
  });

  it('should not delete item if not confirmed', () => {
    spyOn(component['dialogService'], 'showDialog').and.returnValue({
      instance: { dialogClosed: of(false) },
    } as any);
    const deleteSpy = spyOn(component['productService'], 'delete');
    const product = { id: 1 } as any;
    component.onDeleteItem(product);
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
