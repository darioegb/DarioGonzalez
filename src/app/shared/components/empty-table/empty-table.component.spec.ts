import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTableComponent } from './empty-table.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('EmptyTableComponent', () => {
  let component: EmptyTableComponent;
  let fixture: ComponentFixture<EmptyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyTableComponent],
      imports: [TranslateTestingModule.withTranslations(
        'es',
        require('src/assets/i18n/es.json')
      ),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default message when no input provided', () => {
    const defaultMessage = 'No items to display';
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toContain(defaultMessage);
  });

  it('should display provided message', () => {
    const customMessage = 'Custom message';
    component.message = customMessage;
    fixture.detectChanges();
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toContain(customMessage);
  });
});
