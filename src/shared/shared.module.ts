import { NgModule } from '@angular/core';
import { MatTableGridComponent } from './mat-table-grid/mat-table-grid.component';
import { CustomMatTheme } from '../themes/mat.theme';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { FilterColumnsPipe } from './filter-columns.pipe';
@NgModule({
    imports: [CommonModule, CustomMatTheme, ReactiveFormsModule],
    declarations: [MatTableGridComponent, FilterColumnsPipe],
    exports: [MatTableGridComponent, FilterColumnsPipe]
})
export class SharedModule { }