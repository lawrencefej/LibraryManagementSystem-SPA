import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Author } from 'src/app/_models/author';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  @Output() addedAuthor = new EventEmitter();
  author: Author;
  model: any = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addAuthor() {
    this.addedAuthor.emit(this.model);
    this.bsModalRef.hide();
  }

}
