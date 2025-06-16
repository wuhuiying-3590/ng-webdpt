import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
import { HttpServerService } from '../../services/http-server.service';
import { Subscription } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';
import { Console } from 'console';
@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.less'],
})
export class DesignCanvasComponent implements OnInit, OnDestroy {
  @Input() components: any[] = [];
  @ViewChild('listItem') listItemComponent: ListItemComponent;
  selectedComponent: any = null; // 新增
  root: any = {};
  treeData: any[] = [];
  private subscriptions = new Subscription();
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService,
    private httpServerService: HttpServerService
  ) {}

  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }
  getComponentChildStyles(component: any): any {
    return this.componentDataService.getComponentChildStyles(component);
  }

  // 选择组件
  selectComponentItem(event: MouseEvent, component: any): void {
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      // this.listItemComponent.closeEditPop();
      this.selectedComponent = component; // 记录当前选中
      this.canvasDataService.setSelectedComponent(component);
    }
  }
  isSelected(component: any): boolean {
    return (
      this.selectedComponent && this.selectedComponent?.id === component?.id
    );
  }
  // 删除组件
  removeComponent(index: number): void {
    this.components.splice(index, 1);
  }
  ngOnInit(): void {
    // 1. 请求接口获取 webStyleData
    this.httpServerService.getCanvasData().subscribe((canvasData: any) => {
      const webStyleData = JSON.parse(canvasData.webStyleData);
      console.log('webStyleData:', webStyleData);
      // 2. 设置 root 和 treeData
      this.canvasDataService.setRoot(webStyleData.root);
      this.canvasDataService.setTreeData(webStyleData.treeData);
      // this.canvasDataService.setTreeData([]);
    });

    // 3. 订阅 root$ 和 treeData$
    this.subscriptions.add(
      this.canvasDataService.root$.subscribe((root) => {
        this.root = root;
      })
    );
    this.subscriptions.add(
      this.canvasDataService.treeData$.subscribe((treeData) => {
        this.treeData = treeData;
      })
    );
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selectedroot:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  sortableOptions = {
    group: {
      name: 'test',
      pull: true,
      put: function (e) {
        console.log(e);
      },
    },
    // ghostClass: 'sortable-ghost',
    // dragClass: 'sortable-drag',
    // 过滤器，不需要进行拖动的元素
    filter: '.no-drag',
    // 拖拽移动的时候
    onMove: (evt) => {
      console.log('onMove', evt);
    },
    // 列表内元素顺序更新的时候触发
    onUpdate: function (evt) {
      console.log('onUpdate', evt);
    },
    // 开始拖拽的时候
    onStart: function (evt) {
      console.log('onStart', evt);
    },
    // 结束拖拽
    onEnd: function (evt) {
      const { oldIndex, newIndex, oldDraggableIndex, newDraggableIndex } = evt;
      console.log(
        'onEnd',
        oldIndex,
        newIndex,
        oldDraggableIndex,
        newDraggableIndex,
        evt
      );
    },
    // 拖拽元素改变位置的时候
    onChange: function (evt) {
      console.log('onChange', evt);
    },
  };
}
