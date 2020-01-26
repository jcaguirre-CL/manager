import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nombre 1', weight: 'Responsable 1', symbol: 'SI', status: 'CERRADO'},
  {position: 2, name: 'Nombre 2', weight: 'Responsable 1', symbol: 'NO', status: 'CERRADO'},
  {position: 3, name: 'Nombre 3', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 4, name: 'Nombre 4', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 5, name: 'Nombre 5', weight: 'Responsable 1', symbol: 'SI', status: 'CERRADO'},
  {position: 6, name: 'Nombre 6', weight: 'Responsable 1', symbol: 'NO', status: 'CERRADO'},
  {position: 7, name: 'Nombre 7', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 8, name: 'Nombre 8', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 9, name: 'Nombre 9', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 10, name: 'Nombre 10', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
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






