import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CoreService, PeriodicElement } from '../services/core.service';

@Component({
  selector: 'app-primeng-table-grid',
  templateUrl: './primeng-table-grid.component.html',
  styleUrls: ['./primeng-table-grid.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class PrimengTableGridComponent implements OnInit {

  cols: any[];
  cars: PeriodicElement[];

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.cols = this.coreService.tableColumns;
    this.cars = this.coreService.tableRows;
  }

}
