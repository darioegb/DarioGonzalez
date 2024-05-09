import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductResolver } from './shared/product.resolver';
import { idKey } from '@app/constants';

const routes: Routes = [
  {
    path: '',
    component: ProductGridComponent,
  },
  {
    path: 'detail',
    component: ProductDetailComponent,
  },
  {
    path: `detail/:${idKey}`,
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
