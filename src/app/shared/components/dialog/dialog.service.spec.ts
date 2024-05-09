import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog.component';
import { ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';

describe('DialogService', () => {
  let service: DialogService;
  let parentContainer: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService]
    });
    service = TestBed.inject(DialogService);
    parentContainer = { clear: jasmine.createSpy('clear'), createComponent: jasmine.createSpy('createComponent') } as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and return component ref', () => {
    const message = 'Test Message';
    const componentRef = {} as ComponentRef<any>;
    const instance = { message: '' };
    const spy = spyOnProperty(instance, 'message', 'set');
    const mockFactoryResolver = { create: () => componentRef } as unknown as ComponentFactoryResolver;
    spyOn(service as any, 'createComponentFactoryResolver').and.returnValue(mockFactoryResolver);

    const result = service.showDialog(parentContainer, DialogComponent, message);

    expect(parentContainer.clear).toHaveBeenCalled();
    expect(parentContainer.createComponent).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(message);
    expect(result).toEqual(componentRef);
  });
});
