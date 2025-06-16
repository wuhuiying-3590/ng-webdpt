import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
import { HttpServerService } from '../../services/http-server.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.less'],
})
export class DesignCanvasComponent implements OnInit, OnDestroy {
  @Input() components: any[] = [];
  selectedComponent: any = null; // 新增
  root: any = {};
  treeData: any[] = [];
  private subscriptions = new Subscription();
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService,
    private httpServerService: HttpServerService
  ) {}

  // 处理组件拖拽事件
  onDrop(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer) {
      const componentData = event.dataTransfer.getData('component');
      if (componentData) {
        const component = JSON.parse(componentData);
        this.components.push({ ...component, id: Date.now() });
      }
    }
  }
  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }
  getComponentChildStyles(component: any): any {
    return this.componentDataService.getComponentChildStyles(component);
  }
  // 允许拖放
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // 处理组件在画布内部的排序
  onComponentDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }

  // 选择组件
  selectComponentItem(event: MouseEvent, component: any): void {
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      this.selectedComponent = component; // 记录当前选中
      this.canvasDataService.setSelectedComponent(component);
    }
  }
  isSelected(component: any): boolean {
    return this.selectedComponent === component;
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
      // this.canvasDataService.setTreeData(webStyleData.treeData);
      this.canvasDataService.setTreeData([]);
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
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
    // // this.root = webStyleData.root;
    // // this.treeData = webStyleData.treeData;
    // this.canvasDataService.setRoot(webStyleData.treeData);
    // this.canvasDataService.root$.subscribe((root) => {
    //   // 这里可以响应 treeData 的变化
    //   this.root = root;
    // });
    // this.canvasDataService.setTreeData(webStyleData.treeData);
    // this.canvasDataService.treeData$.subscribe((treeData) => {
    //   // 这里可以响应 treeData 的变化
    //   this.treeData = treeData;
    // });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
