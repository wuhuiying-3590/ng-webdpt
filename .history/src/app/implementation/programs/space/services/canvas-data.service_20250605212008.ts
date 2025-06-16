import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createNewItem } from '../widget/models/item';
@Injectable({
  providedIn: 'root',
})
export class CanvasDataService {
  // 画布根节点数据
  private rootSubject = new BehaviorSubject<any>(null);
  root$ = this.rootSubject.asObservable();

  // 组件树数据
  private treeDataSubject = new BehaviorSubject<any[]>([]);
  treeData$ = this.treeDataSubject.asObservable();

  // 选中的组件
  private selectedComponentSubject = new BehaviorSubject<any>(null);
  selectedComponent$ = this.selectedComponentSubject.asObservable();

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
  // 添加组件到 treeData
  addComponent(component: any) {
    console.log('component:', component);
    const newComponent = createNewItem(component.type);
    console.log(
      'selectedComponentSubject',
      this.selectedComponentSubject.value
    );
    const newTreeData = [...this.treeDataSubject.value, newComponent];
    console.log('newTreeData:', newTreeData);
    this.treeDataSubject.next(newTreeData);
  }

  // 其他操作（如删除、更新等）可按需添加
  removeComponent(index: number) {
    const newTreeData = this.treeDataSubject.value.slice();
    newTreeData.splice(index, 1);
    this.treeDataSubject.next(newTreeData);
  }

  updateComponent(index: number, component: any) {
    const newTreeData = this.treeDataSubject.value.slice();
    newTreeData[index] = component;
    this.treeDataSubject.next(newTreeData);
  }
  updateSelectedComponentProperty(property: any) {
    //
  }
}
