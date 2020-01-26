import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nombre 1', weight: 1.0079, symbol: 'H', status: 'CERRADO'},
  {position: 2, name: 'Nombre 2', weight: 4.0026, symbol: 'He', status: 'PDTE'},
  {position: 3, name: 'Nombre 3', weight: 6.941, symbol: 'Li', status: 'PDTE'},
  {position: 4, name: 'Nombre 4', weight: 9.0122, symbol: 'Be', status: 'PDTE'},
  {position: 5, name: 'Nombre 5', weight: 10.811, symbol: 'B', status: 'PDTE'},
  {position: 6, name: 'Nombre 6', weight: 12.0107, symbol: 'C', status: 'CERRADO'},
  {position: 7, name: 'Nombre 7', weight: 14.0067, symbol: 'N', status: 'PDTE'},
  {position: 8, name: 'Nombre 8', weight: 15.9994, symbol: 'O', status: 'PDTE'},
  {position: 9, name: 'Nombre 9', weight: 18.9984, symbol: 'F', status: 'PDTE'},
  {position: 10, name: 'Nombre 10', weight: 20.1797, symbol: 'Ne', status: 'PDTE'},
];

@Component({
  selector: 'app-historial1',
  templateUrl: './historial1.component.html',
  styleUrls: ['./historial1.component.css']
})
export class Historial1Component implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = ELEMENT_DATA;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor() { }

  ngOnInit() {
  }

}






