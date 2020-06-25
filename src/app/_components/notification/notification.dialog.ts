import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IData {
  kind: 'info' | 'warning' | 'error';
  msg: string;
}

@Component({
  templateUrl: './notification.dialog.html',
  styleUrls: ['./notification.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { msg: string, kind: string },
    public dialog: MatDialog
  ) { }

}
