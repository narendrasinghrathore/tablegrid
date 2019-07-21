import { Directive, ElementRef, Renderer2,
  NgZone, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements AfterViewInit {
  selectedTHElement: HTMLElement;
  tableElement: HTMLElement;
  startX: number;
  startingTHWidth: number;
  changedTHWidth: string;
  StartingTableWidth: number;
  changedTableWidth: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private zone: NgZone) { }

  ngAfterViewInit() {
    this.applyListeners();
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(e) {
    this.selectedTHElement = this.el.nativeElement.parentNode;
    this.tableElement = document.getElementById('mat-table');
    this.startX = e.pageX;
    this.startingTHWidth = this.selectedTHElement.clientWidth;
    this.StartingTableWidth = this.tableElement.clientWidth;
  }

  applyListeners() {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', (e) => {
        if (this.selectedTHElement) {
          this.changedTHWidth = (this.startingTHWidth + (e.pageX - this.startX)) + 'px';
          this.changedTableWidth = (this.StartingTableWidth + (e.pageX - this.startX)) + 'px';
          this.renderer.setStyle(this.selectedTHElement, 'width', this.changedTHWidth);
          this.renderer.setStyle(this.tableElement, 'width', this.changedTableWidth);
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
