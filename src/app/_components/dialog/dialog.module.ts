import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './confirm/confirm.dialog';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafePipeModule } from 'safe-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DisplayDialog } from './display/display.dialog';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [ConfirmDialog, DisplayDialog, LayoutComponent],
  entryComponents: [ConfirmDialog, DisplayDialog],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    SafePipeModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [LayoutComponent, ConfirmDialog, DisplayDialog],
})
export class DialogModule { }
