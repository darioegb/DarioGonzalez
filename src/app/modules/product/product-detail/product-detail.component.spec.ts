import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json')
        ),
      ],
      providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with the required controls', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls['id']).toBeDefined();
    expect(component.productForm.controls['name']).toBeDefined();
    expect(component.productForm.controls['description']).toBeDefined();
    expect(component.productForm.controls['logo']).toBeDefined();
    expect(component.productForm.controls['date_release']).toBeDefined();
    expect(component.productForm.controls['date_revision']).toBeDefined();
  });

  it('should mark the form as invalid if ID is not provided', () => {
    component.productForm.patchValue({
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.jpg',
      date_release: '2024-05-08',
      date_revision: '2025-05-08',
    });
    expect(component.productForm.invalid).toBeTruthy();
  });

  it('should mark the form as invalid if ID is too short', () => {
    component.productForm.patchValue({
      id: '12', // ID length < 3
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.jpg',
      date_release: '2024-05-08',
      date_revision: '2025-05-08',
    });
    expect(component.productForm.invalid).toBeTruthy();
  });

  it('should mark the form as invalid if release date is not provided', () => {
    component.productForm.patchValue({
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.jpg',
      date_revision: '2025-05-08',
    });
    expect(component.productForm.invalid).toBeTruthy();
  });

  it('should mark the form as valid if all fields are provided and valid', () => {
    component.productForm.patchValue({
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.jpg',
      date_release: '2024-05-08',
      date_revision: '2025-05-08',
    });
    expect(component.productForm.valid).toBeTruthy();
  });
});
