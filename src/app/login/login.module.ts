import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageRoutingModule } from './login-routing.module';
import { SafePipeModule } from '../_pipes/safe-pipe/safe-pipe.module';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    SafePipeModule
  ]
})
export class LoginModule { }