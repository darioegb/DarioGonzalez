import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Navigation, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpyObj = jasmine.createSpyObj('ProductService', ['get']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    TestBed.configureTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: productServiceSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    });
    resolver = TestBed.inject(ProductResolver);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve product from route extras', () => {
    const mockProduct: Product = {
      id: '1', name: 'Test Product',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date()
    };
    const navigation: Navigation = {
      id: 1, extras: { state: { data: { product: mockProduct } } },
      initialUrl: new UrlTree,
      extractedUrl: new UrlTree,
      trigger: 'imperative',
      previousNavigation: null
    };
    routerSpy.getCurrentNavigation?.and.returnValue(navigation);

    resolver.resolve(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toEqual(mockProduct);
    });
  });

  it('should resolve product from service if not found in route extras', () => {
    const mockProduct: Product = {
      id: '1', name: 'Test Product',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date()
    };
    productServiceSpy.get.and.returnValue(of(mockProduct));
    routerSpy.getCurrentNavigation?.and.returnValue(null);

    resolver.resolve(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toEqual(mockProduct);
    });
    expect(productServiceSpy.get).toHaveBeenCalledOnceWith('1');
  });
});
