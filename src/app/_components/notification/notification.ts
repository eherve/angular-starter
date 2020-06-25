import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationDialog } from './notification.dialog';

export interface IMessage {
  key: string;
  data?: any;
}

export interface IOptions {
  duration?: number;
  hasToolbar?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Notification {

  private notifications: MatDialogRef<NotificationDialog, any>[] = [];

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog
  ) { }

  public async show(kind: 'info' | 'warning' | 'error', message: IMessage, options: IOptions = { duration: 2000, hasToolbar: true }) {
    if (options.duration === undefined) { options.duration = 2000; }
    if (options.duration > 0 && options.duration < 300) { options.duration = 300; }
    const top = options.hasToolbar === false ? 16 : 80;
    const msg = await this.translate.get(message.key, message.data).toPromise();
    const dialogRef = this.dialog.open(NotificationDialog, {
      height: '48px', minWidth: '256px', maxWidth: '30%',
      position: { top: `${top + 64 * this.notifications.length}px`, right: '16px' },
      closeOnNavigation: false, disableClose: true, hasBackdrop: false, autoFocus: false,
      panelClass: ['dialog-notification', kind], data: { msg, kind }
    });
    this.notifications.push(dialogRef);
    dialogRef.afterOpened().toPromise().then(() => dialogRef.addPanelClass('notification-ready'));
    if (options.duration) {
      dialogRef.afterOpened().toPromise().then(() => setTimeout(() => dialogRef.close(), options.duration));
    }
    dialogRef.afterClosed().subscribe(result => {
      const index = this.notifications.indexOf(dialogRef);
      this.notifications.splice(index, 1);
      this.notifications.forEach((n, i) => { n.updatePosition({ top: `${top + 64 * i}px`, right: '16px' }); });
    });
  }

}
