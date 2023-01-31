import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public tableFit = false;
  constructor() {
    this.checkIfTableFits();
  }

  /**
   * dynamically check if table fits view
   */
  @HostListener('window:resize')
  checkIfTableFits(): void {
    this.tableFit = window.innerWidth >= 951;
  }
}
