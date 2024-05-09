import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { idKey } from '@app/constants';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<Product> {
    const product =
      this.router.getCurrentNavigation()?.extras.state?.['data']?.product;
    return product
      ? of(product)
      : this.productService.get(route.paramMap.get(idKey)!);
  }
}
