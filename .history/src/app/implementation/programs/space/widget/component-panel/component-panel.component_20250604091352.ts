import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-component-panel',
  templateUrl: './component-panel.component.html',
  styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent implements OnInit {
  @Output() componentAdded = new EventEmitter<any>();

  // 组件分类及组件数据
  componentCategories = [
    {
      name: '布局组件',
      open: true,
      components: [
        { type: 'single', name: '单列', icon: 'assets/single-col.svg' },
        { type: 'multi', name: '多列', icon: 'assets/multi-col.svg' },
        { type: 'tabs', name: '标签页', icon: 'assets/tabs.svg' },
        { type: 'list', name: '列表', icon: 'assets/list.svg' },
      ],
    },
    {
      name: '基础组件',
      open: true,
      components: [
        { type: 'title', name: '标题', icon: 'assets/title.svg' },
        { type: 'text', name: '内容', icon: 'assets/text.svg' },
        { type: 'divider', name: '分割线', icon: 'assets/divider.svg' },
        { type: 'image', name: '图片', icon: 'assets/image.svg' },
        { type: 'button', name: '按钮', icon: 'assets/button.svg' },
      ],
    },
    {
      name: '高阶组件',
      open: true,
      components: [
        { type: 'table', name: '表格', icon: 'assets/table.svg' },
        {
          type: 'dynamicTable',
          name: '动态表格',
          icon: 'assets/dynamic-table.svg',
        },
      ],
    },
  ];

  // 开始拖拽组件
  onDragStart(event: DragEvent, component: any): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('component', JSON.stringify(component));
    }
  }

  // 点击添加组件
  addComponent(component: any): void {
    this.componentAdded.emit(component);
  }

  ngOnInit(): void {}
}
