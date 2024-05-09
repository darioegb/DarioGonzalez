import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@root/app/shared/shared.module';
import { ProductResolver, ProductService } from './shared';

@NgModule({
  declarations: [ProductGridComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
