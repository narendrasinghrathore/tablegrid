import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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
})
export class MatTableGridComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  columnsForFilter: string[];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  expandedElement: PeriodicElement | null;

  columnsToDisplay = new FormControl([...this.displayedColumns]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  previousIndex: number;
  selectColumnToShow: string[];



  constructor() { }

  ngOnInit(): void {
    //
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getFilterColumns();

    this.selectColumnToShow = [...this.displayedColumns];

    // hide or show columns in table
    this.columnsToDisplay.valueChanges.subscribe(
      data => {
        this.displayedColumns = [...data];
        this.getFilterColumns();
      }
    );


  }


  filterTable(columnName, filterValue) {
    console.log(filterValue.target.value, columnName);

  }

  getFilterColumns() {
    this.columnsForFilter = this.displayedColumns.map(val => `${val}-filter`);
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


  drop(event: CdkDragDrop<string[]>, index) {
    moveItemInArray(this.displayedColumns, this.previousIndex, index);
  }

}
