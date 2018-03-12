import { Component, OnInit } from '@angular/core';
import { FileService } from './../../file.service';

@Component({
  selector: 'media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent implements OnInit {

  private currentDirectory;
  private files: any;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getFiles().subscribe(files => {
      this.files = [files];
      console.log(files);
    });
  }

  setCurrentDir(file) {
    this.currentDirectory = file;
    console.log(file);
  }

  isImage(file) {
    console.log(file);
    return file.name.match(/.(jpg|jpeg|png|gif)$/i);
  }

}
