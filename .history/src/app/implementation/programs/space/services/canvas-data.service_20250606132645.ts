import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createNewItem } from '../widget/models/item';
import { DateUtilsService } from 'app/utils/date-utils.service';
@Injectable({
  providedIn: 'root',
})
export class CanvasDataService {
  // 通过构造函数注入依赖
  constructor(private dateUtilsService: DateUtilsService) {}
  // 画布根节点数据
  private rootSubject = new BehaviorSubject<any>(null);
  root$ = this.rootSubject.asObservable();

  // 组件树数据
  private treeDataSubject = new BehaviorSubject<any[]>([]);
  treeData$ = this.treeDataSubject.asObservable();

  // 选中的组件
  private selectedComponentSubject = new BehaviorSubject<any>(null);
  selectedComponent$ = this.selectedComponentSubject.asObservable();

  // hover的组件
  private hoverComponentSubject = new BehaviorSubject<any>(null);
  hoverComponent$ = this.hoverComponentSubject.asObservable();
  // 获取当前值
  get root() {
    return this.rootSubject.value;
  }
  get treeData() {
    return this.treeDataSubject.value;
  }
  get selectedComponent() {
    return this.selectedComponentSubject.value;
  }
  get hoverComponent() {
    return this.hoverComponentSubject.value;
  }
  // 设置 root
  setRoot(root: any) {
    this.rootSubject.next(root);
  }

  // 设置 treeData
  setTreeData(treeData: any[]) {
    this.treeDataSubject.next(treeData);
  }
  // 设置 selectedComponent
  setSelectedComponent(component: any) {
    this.selectedComponentSubject.next(component);
  }
  // 设置 hoverComponent
  setHoverComponent(component: any) {
    this.hoverComponentSubject.next(component);
  }
  // 添加组件到 treeData
  addComponent(componentType: string) {
    console.log('componentType:', componentType);
    console.log(this.selectedComponentSubject.value);
    const newComponent = createNewItem(componentType);
    const treeData = this.treeDataSubject.value;
    if (
      !this.selectedComponentSubject.value ||
      this.selectedComponentSubject.value.id === 'root'
    ) {
      treeData.push(newComponent);
      this.treeDataSubject.next(treeData);
    } else {
      const selectedComponentId = this.selectedComponentSubject.value.id;
      // 递归查找并更新
      function updateComponentInTree(nodes: any[]): boolean {
        for (const node of nodes) {
          if (node.id === selectedComponentId) {
            node.children.push(newComponent);
            return true; // 找到后返回
          }
          if (node.children && Array.isArray(node.children)) {
            if (updateComponentInTree(node.children)) {
              return true;
            }
          }
        }
        return false;
      }
      if (updateComponentInTree(treeData)) {
        this.treeDataSubject.next(treeData); // 通知所有订阅者
      }
    }
  }

  // 其他操作（如删除、更新等）可按需添加
  removeComponent(index: number) {
    console.log('componentType:', componentType);
    console.log(this.selectedComponentSubject.value);
    const newComponent = createNewItem(componentType);
    const treeData = this.treeDataSubject.value;
    if (
      !this.selectedComponentSubject.value ||
      this.selectedComponentSubject.value.id === 'root'
    ) {
      treeData.push(newComponent);
      this.treeDataSubject.next(treeData);
    } else {
      const selectedComponentId = this.selectedComponentSubject.value.id;
      // 递归查找并更新
      function updateComponentInTree(nodes: any[]): boolean {
        for (const node of nodes) {
          if (node.id === selectedComponentId) {
            node.children.push(newComponent);
            return true; // 找到后返回
          }
          if (node.children && Array.isArray(node.children)) {
            if (updateComponentInTree(node.children)) {
              return true;
            }
          }
        }
        return false;
      }
      if (updateComponentInTree(treeData)) {
        this.treeDataSubject.next(treeData); // 通知所有订阅者
      }
    }
  }

  updateComponent(index: number, component: any) {
    const newTreeData = this.treeDataSubject.value.slice();
    newTreeData[index] = component;
    this.treeDataSubject.next(newTreeData);
  }
  // 更新指定组件的 style
  updateComponentStyle(componentId: string, newStyle: any) {
    const rootData = this.rootSubject.value;
    if (componentId === rootData.id) {
      Object.assign(rootData.style, newStyle);
      this.rootSubject.next(rootData);
    } else {
      const treeData = this.treeDataSubject.value;
      // 递归查找并更新
      function updateStyleInTree(nodes: any[]): boolean {
        for (const node of nodes) {
          if (node.id === componentId) {
            Object.assign(node.style, newStyle);
            return true; // 找到后返回
          }
          if (node.children && Array.isArray(node.children)) {
            if (updateStyleInTree(node.children)) {
              return true;
            }
          }
        }
        return false;
      }
      if (updateStyleInTree(treeData)) {
        this.treeDataSubject.next(treeData); // 通知所有订阅者
      }
    }
  }
}
