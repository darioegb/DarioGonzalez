import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { GenericService } from '@core/services/generic.service';
import { TranslateService } from '@ngx-translate/core';
import { httpMethodKeys } from '@root/app/constants';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(http: HttpClient, translateService: TranslateService) {
    super(http, translateService);
  }

  protected getResourceUrl(): string {
    return 'products';
  }

  checkIdAvailability(id: string | number): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`${this.baseUrl}/verification`, {
        ...this.options,
        params: { id },
      })
      .pipe(catchError((error) => this.handleError(error, httpMethodKeys.get)));
  }
}
