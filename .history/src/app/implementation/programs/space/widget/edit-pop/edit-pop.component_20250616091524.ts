import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { EditPopService } from '../../services/edit-pop.service';

@Component({
  selector: 'app-edit-pop',
  templateUrl: './edit-pop.component.html',
  styleUrls: ['./edit-pop.component.less'],
})
export class EditPopComponent implements OnInit, AfterViewInit {
  @ViewChild('selectBox') selectBoxRef: ElementRef;
  @Input() selectedComponent: any = null;
  constructor(
    private canvasDataService: CanvasDataService,
    private editPopService: EditPopService
  ) {}
  ngAfterViewInit(): void {
    // 这里可以安全访问 @ViewChild 获取到的 DOM 元素*
    // console.log(this.designCanvasRef);
    this.editPopService.setSelectBox(this.selectBoxRef.nativeElement);
  }
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

  evaluateShowCopy() {
    if (this.editPopService.selectEl) {
      const isTitle =
        this.editPopService.selectEl.classList.contains('title-component');
      if (isTitle) {
        this.showCopy = false;
      } else {
        const parentNode = this.editPopService.selectEl.parentNode;
        const childrenLength = Array.from(parentNode.children).length;
        const parentClassNames = parentNode.className;
        console.log('parentClassNames', parentClassNames);
        if (
          parentClassNames.includes('columnLayout-child') ||
          parentClassNames.includes('columnLayout1_1_1-child')
        ) {
          this.showCopy = childrenLength < 6;
        } else if (
          parentClassNames.includes('scrollLayout-child') ||
          parentClassNames.includes('listLayout-child')
        ) {
          this.showCopy = childrenLength < 20;
        } else {
          this.showCopy = true;
        }
      }
    } else {
      this.showCopy = false;
    }
  }
  cloneComponent(): void {
    this.canvasDataService.cloneComponent();
    setTimeout(() => {
      this.editPopService.changeSelectBorderPosition();
      this.evaluateShowCopy();
      this.evaluateShowRemove();
    }, 0);
  }
  // 删除选中组件
  removeComponent(): void {
    // this.showRemove();
    this.canvasDataService.removeComponent();
    setTimeout(() => {
      this.editPopService.changeSelectBorderPosition();
      this.evaluateShowCopy();
      this.evaluateShowRemove();
    }, 0);
  }
  ngOnInit(): void {
    this.editPopService.selectElSubject$.subscribe((selectEl) => {
      console.log('selectEl:', selectEl);
      this.editPopService.changeSelectBorderPosition();
      // 这里可以处理选中组件变化
      this.evaluateShowRemove();
      this.evaluateShowCopy();
    });
  }
}
