import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [AppComponent, DataTableComponent],
  imports: [BrowserModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
