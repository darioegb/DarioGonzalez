import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '@core/services';

describe('LoaderInterceptor', () => {
  let interceptor: LoaderInterceptor;
  let loaderService: LoaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderInterceptor,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(LoaderInterceptor);
    loaderService = TestBed.inject(LoaderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loader on request', () => {
    const testUrl = 'https://api.example.com/test';
    const testData = { test: 'data' };

    loaderService.hide(); // Ensure loader is hidden initially
    const spyShow = spyOn(loaderService, 'show').and.callThrough();

    const httpClient = TestBed.inject(HttpClient);
    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    req.flush(testData);

    expect(spyShow).toHaveBeenCalled();
  });

  it('should hide loader on response', () => {
    const testUrl = 'https://api.example.com/test';
    const testData = { test: 'data' };

    loaderService.show(); // Ensure loader is shown initially
    const spyHide = spyOn(loaderService, 'hide').and.callThrough();

    const httpClient = TestBed.inject(HttpClient);
    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    req.flush(testData);

    expect(spyHide).toHaveBeenCalled();
  });
});
