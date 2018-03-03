import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  objectProps;

  @ViewChild('editor') myTextArea: ElementRef;


  @Output()
  handleForm = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {

  }
  
  ngAfterViewInit() {
    Array.from(document.querySelectorAll('.editor')).forEach(el => {
      ClassicEditor.create(el).then(editor => {
        editor.document.on('change', (eventInfo, name, value, oldValue) => {
          this.form.patchValue({body: editor.getData()});          
        });
      })
      .catch(error => {
        console.error('error', error);
      });      
    })
    
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
      //let value = this.dataObject[prop].value || this.data[prop] || '';
      let value = this.dataObject[prop].value || '';
      //value = this.sanitizer.bypassSecurityTrustHtml(value);
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
