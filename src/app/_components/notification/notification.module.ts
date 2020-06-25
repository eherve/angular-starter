import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { Notification } from './notification';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationDialog } from './notification.dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [NotificationDialog],
  entryComponents: [NotificationDialog],
  providers: [Notification],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NotificationModule { }
