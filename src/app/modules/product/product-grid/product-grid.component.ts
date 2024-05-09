import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Column } from '@shared/models';
import { Product, ProductService } from '@modules/product/shared';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent implements OnInit {
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  dialogContainer!: ViewContainerRef;
  data$!: Observable<Product[]>;
  filteredData$!: Observable<Product[]>;
  columns: Column[] = [
    { name: 'products.grid.columns.name', key: 'name' },
    {
      name: 'products.grid.columns.description',
      key: 'description',
    },
    { name: 'products.grid.columns.logo', key: 'logo', type: 'image' },
    {
      name: 'products.grid.columns.dateRelease',
      key: 'date_release',
      type: 'date',
    },
    {
      name: 'products.grid.columns.dateRevision',
      key: 'date_revision',
      type: 'date',
    },
  ];
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private productService: ProductService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadData(true);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onAdd(): void {
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

  onEditItem(product: Product): void {
    this.router.navigate([`detail/${product.id}`], {
      state: {
        data: {
          product,
        },
      },
      relativeTo: this.route,
    });
  }

  onDeleteItem(product: Product): void {
    const componentRef = this.dialogService.showDialog(
      this.dialogContainer,
      DialogComponent,
      this.translate.instant('globals.dialogs.delete.title', {
        value: product.name,
      })
    );

    const dialogComponent = componentRef.instance as DialogComponent;
    dialogComponent.dialogClosed.subscribe((confirmed: boolean) =>
      this.handleDialogResponse(confirmed, componentRef, product)
    );
  }

  loadData(isFilter = false) {
    if (!isFilter) {
      this.data$ = this.productService.getAll();
    }
    this.filteredData$ = this.data$.pipe(
      map((data) =>
        data
          .filter((item) =>
            Object.keys(item).some((key) =>
              item[key]
                .toString()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            )
          )
          .map((item) => ({
            ...item,
            date_release: this.formatDate(item.date_release),
            date_revision: this.formatDate(item.date_revision),
          }))
      )
    );
  }

  private formatDate(dateString: unknown): Date {
    const [year, month, day]: number[] = (dateString as string)
      .split('T')[0]
      .split('-') as unknown as number[];
    return new Date(year, month - 1, day);
  }

  private handleDialogResponse(
    confirmed: boolean,
    componentRef: ComponentRef<any>,
    product: Product
  ) {
    if (confirmed) {
      this.productService.delete(product.id!).subscribe({
        error: ({ status }) => {
          if (status === 200) this.loadData();
        },
      });
    }
    componentRef.destroy();
  }
}
