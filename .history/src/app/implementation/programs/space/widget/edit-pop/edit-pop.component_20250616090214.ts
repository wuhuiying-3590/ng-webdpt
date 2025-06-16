import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
@Component({
  selector: 'app-edit-pop',
  templateUrl: './edit-pop.component.html',
  styleUrls: ['./edit-pop.component.less'],
})
export class EditPopComponent implements OnInit {
  constructor(private canvasDataService: CanvasDataService) {}
  showRemove = false;
  showCopy = false;
  ngOnInit(): void {}
}
