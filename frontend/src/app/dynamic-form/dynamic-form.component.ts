import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

//declare var ClassicEditor: any;
//declare var CKEDITOR: any;

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  //@Input() data;
  @Input() dataObject;
  form: FormGroup;

  @ViewChild('editor') myTextArea: ElementRef;


  @Output()
  handleForm = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {

  }

  ngAfterViewInit() {
    Array.from(document.querySelectorAll('.editor')).forEach(el => {
      ClassicEditor.create(el).then(editor => {
        editor.document.on('change', (eventInfo, name, value, oldValue) => {
          this.form.patchValue({ body: editor.getData() });
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
        if(!prop.options) {
          formGroup[prop.name] = new FormArray([]);
        } else {
        let controls = [];
        for (let option of prop.options) {
          //console.log(option);
          controls.push(new FormControl(option));
        }
        const arr = new FormArray(controls);
        formGroup[prop.name] = arr;
        console.log('opt', prop.options);
        }
      } else {
        //let value = this.dataObject[prop].value || this.data[prop] || '';
        formGroup[prop.name] = new FormControl(prop.value || '', this.mapValidators(prop.validation));
      }
    }

    this.form = new FormGroup(formGroup);
    console.log('form', this.form);
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
