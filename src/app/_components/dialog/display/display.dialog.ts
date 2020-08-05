import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogData {
  title: string;
  content: string;
  titleParams?: any;
}

@Component({
  templateUrl: './display.dialog.html',
  styleUrls: ['./display.dialog.scss']
})
export class DisplayDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisplayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
  }

}
