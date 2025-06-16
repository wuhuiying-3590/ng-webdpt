import { Component, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-pop',
  templateUrl: './edit-pop.component.html',
  styleUrls: ['./edit-pop.component.less'],
})
export class EditPopComponent implements OnInit {
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
