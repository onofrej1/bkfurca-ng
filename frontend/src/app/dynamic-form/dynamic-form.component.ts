import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() data;
  @Input() dataObject;
  form: FormGroup;
  objectProps;

  @Output()
  handleForm = new EventEmitter();

  constructor() {
  }

  sortDataObject() {
    this.dataObject = Object
      .keys(this.dataObject)
      .sort((a, b) => this.dataObject[a].order - this.dataObject[b].order)
      .reduce((_sortedObj, key) => ({
        ..._sortedObj,
        [key]: this.dataObject[key]
      }), {});
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sortDataObject();
    this.objectProps = Object.keys(this.dataObject)
      .map(prop => {
        return Object.assign({}, { key: prop }, this.dataObject[prop]);
      });
  
    const formGroup = {};

    for (let prop of Object.keys(this.dataObject)) {
      const value = this.dataObject[prop].value || this.data[prop] || '';
      formGroup[prop] = new FormControl(value, this.mapValidators(this.dataObject[prop].validation));
    }

    this.form = new FormGroup(formGroup);
  }

  ngOnInit() {

    // setup the form

  }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  onSubmit(values) {
    //console.log(values);
    this.handleForm.emit(values);
  }

}
