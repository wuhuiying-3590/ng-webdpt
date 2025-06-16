import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
import { HttpServerService } from '../../services/http-server.service';
import { Subscription } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';
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
    group: { name: 'test', pull: true, put: true },
    // ghostClass: 'sortable-ghost',
    // dragClass: 'sortable-drag',
    filter: '.no-drag',
    // 拖拽移动的时候
    onMove: (evt) => {
      // 方法3：动态控制
      const isForbidden = evt.related.getAttribute('data-no-drag') === 'true';
      return !isForbidden;
    },
  };
}
