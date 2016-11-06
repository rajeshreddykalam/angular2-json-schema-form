import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'section-widget',
  template: `
    <div
      [class]="options?.htmlClass"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <label *ngIf="options?.title" [attr.for]="layoutNode?.dataPointer"
        [class]="options?.labelHtmlClass" [class.sr-only]="options?.notitle"
        [innerHTML]="options?.title"></label>

      <div *ngIf="expanded">
        <div *ngFor="let item of layoutNode?.items; let i = index; trackBy: item?.dataPointer">
          <root-widget
            [layoutNode]="item"
            [formSettings]="formSettings"
            [layoutIndex]="layoutIndex.concat(i)"
            [dataIndex]="dataIndex"></root-widget>
        </div>
      </div>

    </div>`,
  styles: [`
    .expandable > label:before { content: '\\25B8'; padding-right: .3em; }
    .expanded > label:before { content: '\\25BE'; padding-right: .2em; }
  `],
})
export class SectionComponent implements OnInit {
  private options: any;
  private expanded: boolean = true;
  @Input() layoutNode: any;
  @Input() formSettings: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.expanded = !this.options.expandable;
  }

  private expand() {
    if (this.options.expandable) this.expanded = !this.expanded;
  }
}
