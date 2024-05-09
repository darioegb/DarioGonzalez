import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    expect(component['isOpen']).toBeFalsy();
    component.toggleDropdown();
    expect(component['isOpen']).toBeTruthy();
    component.toggleDropdown();
    expect(component['isOpen']).toBeFalsy();
  });

  it('should close dropdown on click outside', () => {
    component['isOpen'] = true;
    expect(component['isOpen']).toBeTruthy();

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    const event = new MouseEvent('click', { bubbles: true });
    outsideElement.dispatchEvent(event);

    expect(component['isOpen']).toBeFalsy();

    document.body.removeChild(outsideElement);
  });

  it('should not close dropdown on click inside', () => {
    component['isOpen'] = true;
    expect(component['isOpen']).toBeTruthy();

    const insideElement = fixture.nativeElement.querySelector('.dropdown-content');
    const event = new MouseEvent('click', { bubbles: true });
    insideElement.dispatchEvent(event);

    expect(component['isOpen']).toBeTruthy();
  });
});
