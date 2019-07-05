import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule, } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule,
    MatSortModule, MatSelectModule, MatToolbarModule, MatIconModule, DragDropModule,
    MatInputModule],
  exports: [MatTableModule, MatButtonModule, MatCheckboxModule, MatPaginatorModule,
    MatSortModule, MatSelectModule, MatToolbarModule, MatIconModule, DragDropModule,
    MatInputModule],
})
export class CustomMatTheme { }