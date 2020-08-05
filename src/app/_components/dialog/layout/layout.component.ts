import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  @Input()
  public edge = true;

  public contentMaxHeight = '100%';

  @ViewChild('title', { static: true, read: ElementRef })
  private title: ElementRef;

  @ViewChild('actions', { static: true, read: ElementRef })
  private actions: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const titleStyle = getComputedStyle(this.title.nativeElement);
    const actionsStyleStyle = getComputedStyle(this.actions.nativeElement);
    this.contentMaxHeight = `calc(100%
       - ${this.title.nativeElement.clientHeight}px
       - ${parseInt(titleStyle.marginTop, 10)}px
       - ${parseInt(titleStyle.marginBottom, 10)}px
       - ${this.actions.nativeElement.clientHeight}px
       - ${parseInt(actionsStyleStyle.marginTop, 10)}px
       - ${parseInt(actionsStyleStyle.marginBottom, 10)}px
    )`;
    this.changeDetectorRef.detectChanges();
  }

}
