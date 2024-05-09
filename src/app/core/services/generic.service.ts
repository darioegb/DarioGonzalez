import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { httpMethodKeys } from '@root/app/constants';

export abstract class GenericService<T> {
  public readonly baseUrl = `${environment.apiUrl}/${this.getResourceUrl()}`;
  public readonly options = { headers: { authorId: '1' } };

  constructor(
    protected httpClient: HttpClient,
    protected translateService: TranslateService
  ) {}

  protected abstract getResourceUrl(): string;

  toServerModel(entity: T | T[]): any {
    return entity;
  }

  fromServerModel(json: any): T | T[] {
    return json;
  }

  getAll(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(this.baseUrl, this.options)
      .pipe(
        map((json) => this.fromServerModel(json) as unknown as T[]),
        catchError((error) => this.handleError(error, httpMethodKeys.get))
      );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`, this.options).pipe(
      map((json) => this.fromServerModel(json) as T),
      catchError((error) => this.handleError(error, httpMethodKeys.get))
    );
  }

  add(resource: T): Observable<unknown> {
    return this.httpClient
      .post(this.baseUrl, this.toServerModel(resource), this.options)
      .pipe(
        catchError((error) => this.handleError(error, httpMethodKeys.post))
      );
  }

  delete(id: string | number): Observable<unknown> {
    return this.httpClient
      .delete(this.baseUrl, {...this.options, params: {id}})
      .pipe(
        catchError((error) => this.handleError(error, httpMethodKeys.delete))
      );
  }

  update(resource: T): Observable<unknown> {
    const resourceServer = this.toServerModel(resource);
    return this.httpClient
      .put(this.baseUrl, resourceServer, this.options)
      .pipe(catchError((error) => this.handleError(error, httpMethodKeys.put)));
  }

  protected handleError(
    error: HttpErrorResponse,
    operation: string
  ): Observable<never> {
    // TODO: do something to manage error
    console.log(
      this.translateService.instant(`globals.toasts.${operation}.error`, {
        value: this.translateService.instant(
          `${this.getResourceUrl()}.detail.title`,
        ),
      })
    );

    return throwError(() => error);
  }
}
