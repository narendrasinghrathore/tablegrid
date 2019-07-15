import { Directive, ElementRef, AfterViewInit, Renderer2, NgZone } from '@angular/core';

@Directive({
  selector: '[appTableColumnResizer]'
})
export class TableColumnResizerDirective implements AfterViewInit {

  selectedTHElement: HTMLElement;
  startOffset: number;


  constructor(private el: ElementRef, private renderer: Renderer2, private zone: NgZone) { }


  ngAfterViewInit() {
    this.applyResizer();
  }

  applyResizer() {
    const thArray = this.el.nativeElement.querySelectorAll('th');
    console.log(thArray);
    Array.prototype.forEach.call(thArray,
      (th: HTMLElement) => {
        th.style.position = th.style.position ? th.style.position : 'relative';
        th.style.cssText = `
        background-clip: padding-box;`;
        // const span: HTMLSpanElement = this.renderer.createElement('span');


        /**
         * Span element for holding col resizer helper div below
         */
        // span.style.cssText = `
        // width: 100%;
        // height: 100%;
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        // box-sizing: border-box;
        // `;

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
        // `
        // top: 0px;
        // right: 0px;
        // bottom: 0px;
        // position: absolute;
        // cursor: col-resize;
        // background-color: #444444;opacity: 0.2;`;
        grip.addEventListener('onmouseover', (e) => {
          grip.style.opacity = '1.0';

        });
        grip.addEventListener('onmouseout', (e) => {
          grip.style.opacity = '0.2';

        });

        grip.addEventListener('mousedown', (e) => {
          this.selectedTHElement = th;
          this.startOffset =  th.offsetLeft - e.pageX;
          console.log(th.offsetWidth, e.pageX, this.startOffset)
        });

        this.renderer.setStyle(th, 'width', '200px');


        // this.renderer.appendChild(span, grip);
        // this.renderer.insertBefore(th, span, th.firstChild);
        this.renderer.appendChild(th, grip);
      });

    this.zone.runOutsideAngular(() => {
      const tb: HTMLTableElement = (this.el.nativeElement);

      document.addEventListener('mousemove', (e) => {
        if (this.selectedTHElement) {
          const val = this.startOffset + e.pageX + 'px';
          // this.renderer.setStyle(this.selectedTHElement, 'left', e.pageX - this.startOffset + tb.scrollLeft + 'px');
          this.renderer.setStyle(this.selectedTHElement, 'width', val);
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
