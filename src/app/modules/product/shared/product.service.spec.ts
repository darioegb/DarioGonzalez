import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { TranslateService } from '@ngx-translate/core';
import { Product } from './product.model';
import { TranslateTestingModule } from 'ngx-translate-testing';

const mockData: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    logo: 'https://example.com/logo1.png',
    date_release: '2024-01-01T00:00:00',
    date_revision: '2024-01-15T00:00:00',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    logo: 'https://example.com/logo2.png',
    date_release: '2024-02-01T00:00:00',
    date_revision: '2024-02-15T00:00:00',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    logo: 'https://example.com/logo3.png',
    date_release: '2024-03-01T00:00:00',
    date_revision: '2024-03-15T00:00:00',
  },
] as never;

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json')
        ),
      ],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const testData: Product[] = [...mockData];
    service.getAll().subscribe((products) => {
      expect(products).toEqual(testData);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should add product', () => {
    const newProduct: Product = { ...mockData[0] };
    service.add(newProduct).subscribe(() => {});

    const req = httpMock.expectOne('http://localhost:4200/api/products');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get product by id', () => {
    const testId = '1';
    const testData: Product = { ...mockData[0] };
    service.get(testId).subscribe((product) => {
      expect(product).toEqual(testData);
    });

    const req = httpMock.expectOne(
      `http://localhost:4200/api/products/${testId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should delete product', () => {
    const testId = '1';
    service.delete(testId).subscribe(() => {});

    const req = httpMock.expectOne(
      `http://localhost:4200/api/products?${testId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update product', () => {
    const updatedProduct: Product = { ...mockData[0] };
    service.update(updatedProduct).subscribe(() => {});

    const req = httpMock.expectOne('http://localhost:4200/api/products');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should handle error on getAll', () => {
    const errorMsg = 'Error occurred';
    spyOn(service['translateService'], 'instant').and.returnValue(errorMsg);
    service.getAll().subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toEqual(errorMsg);
      },
    });

    const req = httpMock.expectOne('http://localhost:4200/api/products');
    req.error(new ErrorEvent('Network error'));
  });
});
