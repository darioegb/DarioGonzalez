import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class LayoutsModule {}
