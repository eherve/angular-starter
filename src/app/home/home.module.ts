import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatIconModule
  ]
})
export class HomeModule { }
