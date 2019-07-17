import { Directive, ElementRef, AfterViewInit, Renderer2, NgZone } from '@angular/core';

@Directive({
  selector: '[appTableColumnResizer]'
})
export class TableColumnResizerDirective implements AfterViewInit {

  selectedTHElement: HTMLElement;
  startOffset: number;
  startX: number;
  startWidth: number;
  changedWidth: string;
  tableWidth: number;
  changedTableWidth: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private zone: NgZone) { }


  ngAfterViewInit() {
    this.applyResizer();
  }

  applyResizer() {
    const thArray = this.el.nativeElement.querySelectorAll('th');
    Array.prototype.forEach.call(thArray,
      (th: HTMLElement) => {
        th.style.position = th.style.position ? th.style.position : 'relative';
        th.style.cssText = `
        background-clip: padding-box;`;
        /**
         * Grip to hold th to drag horizontally
         */

        const grip: HTMLDivElement = this.renderer.createElement('div');
        grip.innerHTML = '&nbsp;';
        grip.style.cssText = `
        display: block;
        position: absolute !important;
        top: 0;
        right: 0;
        margin: 0;
        width: .5em;
        height: 100%;
        padding: 0px;
        cursor:col-resize;
        border-right: 1px solid;
        `;
        grip.addEventListener('onmouseover', (e) => {
          grip.style.opacity = '1.0';

        });
        grip.addEventListener('onmouseout', (e) => {
          grip.style.opacity = '0.2';

        });

        grip.addEventListener('mousedown', (e) => {
          this.selectedTHElement = th;
          this.startX = e.pageX;
          this.startWidth = th.clientWidth;
          this.startOffset = th.offsetLeft - e.pageX;
          this.tableWidth = this.el.nativeElement.clientWidth;
        });
        this.renderer.appendChild(th, grip);
      });

    this.zone.runOutsideAngular(() => {
      const tb: HTMLTableElement = (this.el.nativeElement);

      document.addEventListener('mousemove', (e) => {
        if (this.selectedTHElement) {
          const val = this.startOffset + e.pageX + 'px';
          // const val = this.startOffset + e.pageX + 'px';
          this.changedWidth = (this.startWidth + (e.pageX - this.startX)) + 'px';
          this.changedTableWidth = (this.tableWidth + (e.pageX - this.startX)) + 'px';
          this.renderer.setStyle(this.selectedTHElement, 'width', this.changedWidth);
          this.renderer.setStyle(this.el.nativeElement, 'width', this.changedTableWidth);
        }
      });
    });


    this.zone.runOutsideAngular(() => {
      document.addEventListener('mouseup', () => {
        this.selectedTHElement = undefined;
      });
    });
  }
}
