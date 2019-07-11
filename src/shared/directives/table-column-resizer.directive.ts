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
        console.log(th.style.position)
        const span: HTMLSpanElement = this.renderer.createElement('span');
        span.style.width = '100%';
        span.style.height = '100%';
        span.style.position = 'absolute';

        const grip: HTMLDivElement = this.renderer.createElement('div');
        grip.innerHTML = '&nbsp;';
        grip.style.top = '0px';
        grip.style.right = '0px';
        grip.style.bottom = '0px';
        grip.style.width = '100%';
        grip.style.position = 'absolute';
        grip.style.cursor = 'col-resize';
        grip.addEventListener('mousedown', (e) => {
          this.selectedTHElement = th;
          this.startOffset = th.offsetWidth - e.pageX;
        });

        this.renderer.appendChild(span, grip);
        this.renderer.appendChild(th, span);
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
