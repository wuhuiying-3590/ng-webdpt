import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  // 获取当前值
  get root() {
    return this.rootSubject.value;
  }
  get treeData() {
    return this.treeDataSubject.value;
  }

  // 设置 root
  setRoot(root: any) {
    this.rootSubject.next(root);
  }

  // 设置 treeData
  setTreeData(treeData: any[]) {
    this.treeDataSubject.next(treeData);
  }

  // 添加组件到 treeData
  addComponent(component: any) {
    console.log('component:', component);
    // const newTreeData = [...this.treeDataSubject.value, component];
    // this.treeDataSubject.next(newTreeData);
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
}
