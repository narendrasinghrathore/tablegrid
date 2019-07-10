import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { ViewEncapsulation } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface IColumnResize {
  name: string;
  width: any;
  [key: string]: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-mat-table-grid',
  templateUrl: './mat-table-grid.component.html',
  styleUrls: ['./mat-table-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MatTableGridComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  columnsForFilter: IColumnResize[];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  expandedElement: PeriodicElement | null;

  columnsToDisplay = new FormControl([...this.displayedColumns]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  previousIndex: number;
  selectColumnToShow: string[];

  /**
   * Resize columns
   */
  @ViewChild(MatTable, { static: true, read: ElementRef }) private matTableRef: ElementRef;
  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;



  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    //
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.setFilterColumns();

    this.selectColumnToShow = [...this.displayedColumns];

    // hide or show columns in table
    this.columnsToDisplay.valueChanges.subscribe(
      data => {
        this.displayedColumns = [...data];
        this.setFilterColumns();
      }
    );


  }

  ngAfterViewInit() {
    // this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  filterTable(columnName, filterValue) {
    console.log(filterValue.target.value, columnName);

  }

  setFilterColumns() {
    this.columnsForFilter = this.displayedColumns.map(val => {
      return {
        name: `${val}-filter`,
        width: 300

      };
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isHidden(column: string) {
    return this.columnsToDisplay.value.indexOf(column) === -1;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  drag(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }


  drop(event: CdkDragDrop<string[]>, index: number) {
    moveItemInArray(this.displayedColumns, this.previousIndex, index);
    moveItemInArray(this.columnsForFilter, this.previousIndex, index);
  }

  /**
   * Return array for filter columns
   */
  get getFilterColumns() {
    return this.columnsForFilter.map(val => val.name);
  }

  /**
   * Resize columns
   */

  setDisplayedColumns() {
    this.columnsForFilter.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.name;
    });
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columnsForFilter.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columnsForFilter.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }


  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if ((index === 0) ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 && index !== this.columnsForFilter.length - 1)) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[0].children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      if (this.pressed && event.buttons) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        if (this.currentResizeIndex === index && width > 50) {
          this.setColumnWidthChanges(index, width);
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columnsForFilter[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = (this.isResizingRight) ? index + 1 : index - 1;
      const newWidth = this.columnsForFilter[j].width - dx;
      if (newWidth > 50) {
        this.columnsForFilter[index].width = width;
        this.setColumnWidth(this.columnsForFilter[index]);
        this.columnsForFilter[j].width = newWidth;
        this.setColumnWidth(this.columnsForFilter[j]);
      }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(document.getElementsByClassName('mat-column-' + column.name));
    columnEls.forEach((el: HTMLDivElement) => {
      el.style.width = column.width + 'px';
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

}
