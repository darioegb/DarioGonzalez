import {
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  showDialog<T>(
    parentContainer: ViewContainerRef,
    component: Type<T>,
    message: string
  ): ComponentRef<T> {
    parentContainer.clear();

    const componentRef = parentContainer.createComponent(component);

    (componentRef.instance as DialogComponent).message = message;

    return componentRef;
  }
}
