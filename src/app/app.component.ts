import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mat-table-grid';
  constructor( matRegister: MatIconRegistry, sant: DomSanitizer){
    matRegister.addSvgIcon(
      'delete',
      sant.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    )
  }
}
