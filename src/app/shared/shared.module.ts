import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EmptyTableComponent } from './components/empty-table/empty-table.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    DropdownComponent,
    EmptyTableComponent,
    FilterComponent,
    PaginatorComponent,
    TableComponent,
    DialogComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, TranslateModule.forChild()],
  exports: [
    TranslateModule,
    DropdownComponent,
    FilterComponent,
    PaginatorComponent,
    TableComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
