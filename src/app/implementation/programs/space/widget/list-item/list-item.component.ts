import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ComponentDataService } from '../../services/component-data.service';
import { CanvasDataService } from '../../services/canvas-data.service';
import { EditPopService } from '../../services/edit-pop.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  @Input() components: any[] = [];
  @Input() componentSortablejsOptions: any = {};
  selectedComponent: any = null; // 新增
  hoverComponentStack: any[] = [];

  constructor(
    private componentDataService: ComponentDataService,
    private canvasDataService: CanvasDataService,
    private editPopService: EditPopService,
    private cdr: ChangeDetectorRef
  ) {}
  // 选择组件
  selectComponentItem(
    event: MouseEvent,
    component: any,
    selectEl: HTMLElement
  ): void {
    // console.log(component);
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      this.selectedComponent = component; // 记录当前选中
      this.editPopService.setSelectEl(selectEl);
      this.canvasDataService.setSelectedComponent(component);
    }
  }

  isSelected(component: any): boolean {
    return (
      this.selectedComponent && this.selectedComponent?.id === component?.id
    );
  }
  isEmpty(component): boolean {
    return !component?.children || component?.children?.length === 0;
  }

  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }

  getComponentChildStyles(component: any): any {
    return this.componentDataService.getComponentChildStyles(component);
  }
  onMouseEnter(event: MouseEvent, component: any) {
    // console.log('onMouseEnter', component);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      this.hoverComponentStack.push(component);
      this.canvasDataService.setHoverComponent(this.hoverComponentStack);
    }
  }

  onMouseLeave(event: MouseEvent, component: any) {
    // console.log('onMouseLeave', component, event);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      const idx = this.hoverComponentStack.indexOf(component);
      if (idx !== -1) {
        this.hoverComponentStack.splice(idx, 1);
        this.canvasDataService.setHoverComponent(this.hoverComponentStack);
      }
    }
  }
  isHover(component: any): boolean {
    const top =
      this.hoverComponentStack[this.hoverComponentStack.length - 1] || null;
    return top === component;
  }
  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
    this.canvasDataService.hoverComponent$.subscribe((hover) => {
      // console.log('hover:', hover);
      this.hoverComponentStack = hover || [];
    });
  }
  onScroll(event: MouseEvent) {
    // console.log(event);
    const target = event.target as Node;
    const select = this.editPopService.selectEl;
    if (select) {
      // const selectParentNode = select.parentNode;
      // console.log(target === selectParentNode);
      if (target.contains(select)) {
        const isInView = this.editPopService.isElementInHorizontalView(
          target,
          select
        );
        const selectBox = this.editPopService.selectBox;
        !isInView
          ? selectBox.classList.add('hidePop')
          : selectBox.classList.remove('hidePop');
        this.editPopService.changeSelectBorderPosition();
      }
    }
  }
}
