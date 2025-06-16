import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
// import { ComponentType } from '../models/item';
import { ComponentDataService } from '../../services/component-data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { componentList } from '../constants';
import { getComponentByType } from '../constants';
@Component({
  selector: 'app-component-panel',
  templateUrl: './component-panel.component.html',
  styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent implements OnInit {
  @Output() closePanel = new EventEmitter<any>();
  getComponentByType = getComponentByType;
  // 组件分类及组件数据
  componentCategories = [
    {
      name: '布局组件',
      open: true,
      components: componentList.slice(0, 4),
      // [
      //   {
      //     type: ComponentType.SINGLE_COLUMN,
      //     name: '单列',
      //     icon: 'assets/img/widget/SINGLE_COLUMN.webp',
      //   },
      //   {
      //     type: ComponentType.MULTI_COLUMN,
      //     name: '多列',
      //     icon: 'assets/img/widget/MULTI_COLUMN.webp',
      //   },
      //   {
      //     type: ComponentType.HORIZONTAL,
      //     name: '横滑',
      //     icon: 'assets/img/widget/HORIZONTAL.webp',
      //   },
      //   {
      //     type: ComponentType.LIST,
      //     name: '列表',
      //     icon: 'assets/img/widget/LIST.webp',
      //   },
      // ],
    },
    {
      name: '基础组件',
      open: true,
      components: componentList.slice(4, 9),
      // [
      //   { type: 'title', name: '标题', icon: 'assets/img/widget/TITLE.webp' },
      //   { type: 'text', name: '内容', icon: 'assets/img/widget/CONTENT.webp' },
      //   {
      //     type: 'divider',
      //     name: '分割线',
      //     icon: 'assets/img/widget/DIVIDER.webp',
      //   },
      //   { type: 'image', name: '图片', icon: 'assets/img/widget/IMAGE.webp' },
      //   { type: 'button', name: '按钮', icon: 'assets/img/widget/BUTTON.webp' },
      // ],
    },
    {
      name: '高阶组件',
      open: true,
      components: componentList.slice(9, 11),
      // [
      //   { type: 'table', name: '表格', icon: 'assets/img/widget/TABLE.webp' },
      //   {
      //     type: 'dynamicTable',
      //     name: '动态表格',
      //     icon: 'assets/img/widget/DYNAMIC_TABLE.webp',
      //   },
      // ],
    },
  ];
  needChangeTitlePosition = false;
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService,
    private messageService: NzMessageService
  ) {}
  onPanelActiveChange(index: number, $event: boolean): void {
    this.componentCategories[index].open = $event;
  }
  // 开始拖拽组件
  onDragStart(event: DragEvent, component: any): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('component', JSON.stringify(component));
    }
  }

  // 点击添加组件
  addComponent(component: any): void {
    this.canvasDataService.addComponent(component.type);
  }

  handleClosePanel() {
    this.closePanel.emit();
  }

  // New SortableJS options for the component panel
  componentPanelSortableOptions = {
    group: {
      name: 'componentPanel',
      pull: 'clone', // Allow cloning items when dragging out
      put: false, // Do not allow dropping items into this list
    },
    sort: false,
    onClone: (evt) => {
      console.log('onClone', evt);
    },
    ghostClass: 'panel-ghost',
    dragClass: 'panel-drag',
    setData: (dataTransfer, dragEl) => {
      // console.log(dataTransfer, dragEl);
      const type = dragEl.getAttribute('data-type');
      // console.log(type);
      const { icon: imgSrc, name: componentName } =
        this.getComponentByType(type);
      let dragPreview = document.getElementById('custom-drag-preview');
      if (!dragPreview) {
        dragPreview = document.createElement('div');
        dragPreview.id = 'custom-drag-preview';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = `
        width: 30px;
        height: 20px;
        margin-right: 8px;
      `;
        const text = document.createElement('span');
        text.textContent = componentName || '未知组件';
        text.style.cssText = `
        font-size: 12px;
        color: #3e59cc;
      `;
        dragPreview.appendChild(img);
        dragPreview.appendChild(text);
        document.body.appendChild(dragPreview);
      }
      // 确保 preview 被插入且有尺寸
      const rect = dragPreview.getBoundingClientRect();
      const offsetX = rect.width;
      const offsetY = rect.height;

      // 偏移控制：设置显示在鼠标右下角，例如右20、下20
      dataTransfer.setDragImage(dragPreview, -20, -20);
      // dataTransfer.setDragImage(dragPreview, -offsetX, -offsetY);
    },
    onMove: (evt) => {
      const relatedEl = evt.related; // 当前 hover 的目标位置元素
      const componentType = evt.dragged.type;
      const relatedIndex = [...evt.to.children].indexOf(relatedEl);
      console.log(evt, relatedEl, relatedIndex);
      // 如果想阻止拖到标题（index 0）前
      if (componentType === 'title' && relatedIndex === 0) {
        debugger;
        // this.needChangeTitlePosition = true;
        this.canvasDataService.setNeedChangeTitlePosition(true);
        return true; // 阻止拖拽
      }
      return true;
    },
    onEnd: (evt) => {
      console.log('onEnd---componentPanelSortableOptions');
      if (this.canvasDataService.needChangeTitlePosition) {
        const pId = evt.from.dataset.pId;
        const cIndex = evt.oldIndex;
        evt.to.removeChild(evt.item);
        this.canvasDataService.changeTitlePosition(pId, cIndex);
        this.canvasDataService.setNeedChangeTitlePosition(false);
      }
      // 拖拽结束后清理 dragPreview
      const dragPreview = document.getElementById('custom-drag-preview');
      if (dragPreview) {
        dragPreview.remove(); // 或 document.body.removeChild(dragPreview);
      }
    },
  };

  ngOnInit(): void {}
}
