import { NgModule } from '@angular/core';
import { MatTableGridComponent } from './mat-table-grid/mat-table-grid.component';
import { CustomMatTheme } from '../themes/mat.theme';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule, CustomMatTheme],
    declarations: [MatTableGridComponent],
    exports: [MatTableGridComponent]
})
export class SharedModule { }