import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from './../../crud.service';
import { CrudComponent } from './../crud/crud.component';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  @Input() models;
  @Input() components;
  crud: CrudService;
  protected modelNames: string[];

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.modelNames = Object.keys(this.models);
  }

}
