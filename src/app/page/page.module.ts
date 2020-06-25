import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagePage } from './page.page';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { PagePageRoutingModule } from './page-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PagePage],
  imports: [
    CommonModule,
    PagePageRoutingModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatIconModule
  ]
})
export class PageModule { }
