import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentType } from '../models/item';
@Component({
  selector: 'app-component-panel',
  templateUrl: './component-panel.component.html',
  styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent implements OnInit {
  @Output() componentAdded = new EventEmitter<any>();
  @Output() closePanel = new EventEmitter<any>();

  // 组件分类及组件数据
  componentCategories = [
    {
      name: '布局组件',
      open: true,
      components: [
        {
          type: ComponentType.SINGLE_COLUMN,
          name: '单列',
          icon: 'assets/img/widget/SINGLE_COLUMN.webp',
        },
        {
          type: ComponentType.MULTI_COLUMN,
          name: '多列',
          icon: 'assets/img/widget/MULTI_COLUMN.webp',
        },
        {
          type: ComponentType.HORIZONTAL,
          name: '横滑',
          icon: 'assets/img/widget/HORIZONTAL.webp',
        },
        {
          type: ComponentType.LIST,
          name: '列表',
          icon: 'assets/img/widget/LIST.webp',
        },
      ],
    },
    {
      name: '基础组件',
      open: true,
      components: [
        { type: 'title', name: '标题', icon: 'assets/img/widget/TITLE.webp' },
        { type: 'text', name: '内容', icon: 'assets/img/widget/CONTENT.webp' },
        {
          type: 'divider',
          name: '分割线',
          icon: 'assets/img/widget/DIVIDER.webp',
        },
        { type: 'image', name: '图片', icon: 'assets/img/widget/IMAGE.webp' },
        { type: 'button', name: '按钮', icon: 'assets/img/widget/BUTTON.webp' },
      ],
    },
    {
      name: '高阶组件',
      open: true,
      components: [
        { type: 'table', name: '表格', icon: 'assets/img/widget/TABLE.webp' },
        {
          type: 'dynamicTable',
          name: '动态表格',
          icon: 'assets/img/widget/DYNAMIC_TABLE.webp',
        },
      ],
    },
  ];
  constructor(private canvasDataService: CanvasDataService) {}
  onPanelActiveChange(index: number, open: boolean): void {
    this.componentCategories[index].open = open;
  }
  // 开始拖拽组件
  onDragStart(event: DragEvent, component: any): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('component', JSON.stringify(component));
    }
  }

  // 点击添加组件
  addComponent(component: any): void {
    // this.componentAdded.emit(component);
    this.canvasDataService.addComponent(component);
  }

  handleClosePanel() {
    this.closePanel.emit();
  }
  ngOnInit(): void {}
}
