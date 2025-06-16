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
  evaluateShowRemove() {
    if (this.editPopService.selectEl) {
      // console.log(this.editPopService.selectEl);
      // console.log(
      //   this.editPopService.selectEl.classList.contains('slot-component')
      // );
      const isSlot =
        this.editPopService.selectEl.classList.contains('slot-component');
      if (isSlot) {
        const parentNode = this.editPopService.selectEl.parentNode;
        const childrenLength = Array.from(parentNode.children).length;
        this.showRemove = childrenLength > 1;
      } else {
        this.showRemove = true;
      }
    } else {
      this.showRemove = false;
    }
  }
  ngOnInit(): void {}
}
