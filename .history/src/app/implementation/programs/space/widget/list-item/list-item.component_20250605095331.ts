import { Component, OnInit } from '@angular/core';
import { webStyleData } from '../design-canvas/webData';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  treeData: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.treeData = webStyleData.treeData;
  }
}
