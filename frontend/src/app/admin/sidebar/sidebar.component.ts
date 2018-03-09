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

  @Output()
  changeContent = new EventEmitter<Object>();

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.modelNames = Object.keys(this.models);
  }

  setModel(modelName: string) {
    
    this.changeContent.emit(CrudComponent);
    setTimeout(function() {
        
    }, 1500);
    this.crud.setModelName(modelName);
    
    //this.crud.getModelName().subscribe(modelName => { console.log(modelName)});
  }

  setContent(component) {
    console.log('content', component);
    this.changeContent.emit(component);
  }

}
