import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {CalendarModule} from 'primeng/calendar';
import Manager from './Manager.js';

//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
//import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';


//import Editor from './editor.js';
let Editor = require('./editor.js');

//declare var aaa: Editor;
// let Essentials = require('@ckeditor/ckeditor5-essentials/src/essentials.js');
//let Bold = require('@ckeditor/ckeditor5-basic-styles');


@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() dataObject;
  form: FormGroup;

  @Output()
  handleForm = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(Editor);
    // setup the form
  }

  ngAfterViewInit() {
    this.initCkeditorInputs();
  }

  initCkeditorInputs() {
    Array.from(document.querySelectorAll('.editor')).forEach(el => {
      Editor.create(el, {
        //plugins: [ Bold ],
        toolbar: [ 'bold' ],
      }).then(editor => {
        console.log('ok');
        editor.document.on('change', (eventInfo, name, value, oldValue) => {
          this.form.patchValue({ [editor.element.id]: editor.getData() });
        });
      })
        .catch(error => {
          console.error('error', error);
        });
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const formGroup = {};

    for (let prop of this.dataObject) {
      if (prop.type == 'checklist') {
        let controls = this.createOptionControls(prop);
        formGroup[prop.name] = new FormArray(controls);
      } else {
        formGroup[prop.name] = new FormControl(prop.value || '', this.mapValidators(prop.validation));
      }
    }

    this.form = new FormGroup(formGroup);
    console.log('form', this.form);
  }

  createOptionControls(prop) {
    let options = prop.options || [];
    let controls = [];
    for (let option of options) {
      let value = prop.value && prop.value.indexOf(option.value) !== -1;
      controls.push(new FormControl(value));
    }
    return controls;
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
    for (let key in values) {
      // upravit
      if (values[key] instanceof Array && values[key].every(v => typeof v === 'boolean')) {
        values[key] = this.getOptionValues(key, values);
      }
    }
    //console.log(values);
    this.handleForm.emit(values);
  }

  cancelSubmit() {
    this.cancel.emit();
  }

  getOptionValues(key, values) {
    let obj = this.dataObject.find(obj => obj.name == key);
    let options = [];
    values[key].forEach(function (value, i) {
      value ? options.push(obj.options[i].value) : null;
    })
    return options;
  }

}
