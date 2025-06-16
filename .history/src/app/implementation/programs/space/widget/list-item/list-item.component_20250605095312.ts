import { Component, OnInit } from '@angular/core';
import { webStyleData } from './webData';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  treeData: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
