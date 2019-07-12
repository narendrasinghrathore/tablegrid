import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTableColumnResizer]'
})
export class TableColumnResizerDirective implements AfterViewInit {

  selectedTHElement: HTMLElement;
  startOffset: number;


  constructor(private el: ElementRef, private renderer: Renderer2) { }


  ngAfterViewInit() {
    this.applyResizer();
  }

  applyResizer() {
    const thArray = this.el.nativeElement.querySelectorAll('th');
    Array.prototype.forEach.call(thArray,
      (th: HTMLElement) => {
        th.style.position = th.style.position ? th.style.position : 'relative';
        const span: HTMLSpanElement = this.renderer.createElement('span');


        /**
         * Span element for holding col resizer helper div below
         */
        span.style.cssText = `
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        `;

        /**
         * Grip to hold th to drag horizontally
         */

        const grip: HTMLDivElement = this.renderer.createElement('div');
        grip.innerHTML = '&nbsp;';
        grip.style.cssText = `
        top: 0px;
        right: 0px;
        bottom: 0px;
        position: absolute;
        cursor: col-resize;
        background-color: #444444;opacity: 0.2;`;
        grip.addEventListener('onmouseover', (e) => {
          grip.style.opacity = '1.0';

        });
        grip.addEventListener('onmouseout', (e) => {
          grip.style.opacity = '0.2';

        });

        grip.addEventListener('mousedown', (e) => {
          this.selectedTHElement = th;
          this.startOffset = th.offsetWidth - e.pageX;
          console.log(th.offsetWidth, e.pageX, this.startOffset)
        });

        this.renderer.setStyle(th, 'width', '200px');


        this.renderer.appendChild(span, grip);
        this.renderer.insertBefore(th, span, th.firstChild);
        // this.renderer.appendChild(th, span);
      });

    document.addEventListener('mousemove', (e) => {
      if (this.selectedTHElement) {
        const val = this.startOffset + e.pageX + 'px';
        this.renderer.setStyle(this.selectedTHElement, 'width', val);
      }
    });

    document.addEventListener('mouseup', () => {

      this.selectedTHElement = undefined;
    });
  }
}
