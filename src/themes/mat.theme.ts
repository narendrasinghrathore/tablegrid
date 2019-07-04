import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule, } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  imports: [MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule,
    MatSortModule, MatSelectModule],
  exports: [MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule,
    MatSortModule, MatSelectModule],
})
export class CustomMatTheme { }