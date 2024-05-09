import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations(
        'es',
        require('src/assets/i18n/es.json')
      ),],
      declarations: [DialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false on cancel button click', () => {
    const emitSpy = spyOn(component.dialogClosed, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('button');
    cancelButton.click();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should emit true on confirm button click', () => {
    const emitSpy = spyOn(component.dialogClosed, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.primary');
    confirmButton.click();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should display message', () => {
    const message = 'Test Message';
    component.message = message;
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toContain(message);
  });
});
