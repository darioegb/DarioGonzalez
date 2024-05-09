import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from './app-layout.component';
import { LoaderService } from '@core/services';
import { Observable, of } from 'rxjs';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockLoaderService {
  isLoading$: Observable<boolean> = of(false);
}

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLayoutComponent],
      providers: [
        { provide: LoaderService, useClass: MockLoaderService }
      ],
      imports: [RouterTestingModule, TranslateTestingModule.withTranslations(
        'es',
        require('src/assets/i18n/es.json')
      ),]
    }).compileComponents();

    loaderService = TestBed.inject(LoaderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading$ from loader service', () => {
    const mockValue = true;
    const mockLoaderService = TestBed.inject(LoaderService) as MockLoaderService;
    mockLoaderService.isLoading$ = of(mockValue);

    component.ngOnInit();
    expect(component.isLoading$).toBeDefined();
    component.isLoading$!.subscribe(value => {
      expect(value).toEqual(mockValue);
    });
  });
});
