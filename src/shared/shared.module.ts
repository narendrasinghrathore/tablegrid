import { NgModule } from '@angular/core';
import { MatTableGridComponent } from './mat-table-grid/mat-table-grid.component';
import { CustomMatTheme } from '../themes/mat.theme';
@NgModule({
    imports: [CustomMatTheme],
    declarations: [MatTableGridComponent],
    exports: [MatTableGridComponent]
})
export class SharedModule { }