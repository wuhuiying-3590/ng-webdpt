import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createNewItem } from '../widget/models/item';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root',
})
export class CanvasDataService {
  constructor(private message: NzMessageService) {}
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
  createNewComponent(componentType, options?) {
    const newComponent = createNewItem(componentType, options);
    return newComponent;
  }

  addTitleComponent(newComponent) {
    const treeData = this.treeDataSubject.value;
    if (treeData?.[0]?.type !== 'title') {
      treeData.unshift(newComponent);
      return true;
    } else {
      this.message.create('warning', `只可以添加一个标题组件`);
      return false;
    }
  }
  addComponentInRoot(newComponent, cIndex?: number) {
    const treeData = this.treeDataSubject.value;
    if (newComponent.type === 'title') {
      if (this.addTitleComponent(newComponent)) {
        this.treeDataSubject.next(treeData);
      }
    } else {
      cIndex || cIndex === 0
        ? treeData.splice(cIndex, 0, newComponent)
        : treeData.push(newComponent);
      this.treeDataSubject.next(treeData);
    }
  }
  addComponentInTreeData(
    newComponent,
    pId: string | undefined = this.selectedComponentSubject.value?.id,
    cIndex?: number
  ) {
    const treeData = this.treeDataSubject.value;
    const updateComponentInTree = (nodes: any[]): boolean => {
      for (const node of nodes) {
        if (node.id === pId) {
          if (newComponent.type === 'title') {
            const msg = '标题组件只能放在卡片首位';
            // if (pId.includes('title')) {
            //   msg = '只可以添加一个标题组件';
            // }
            this.message.create('warning', msg);
            return false;
          }
          cIndex || cIndex === 0
            ? node.children.splice(cIndex, 0, newComponent)
            : node.children.push(newComponent);
          return true; // 找到后返回
        }
        if (node.children && Array.isArray(node.children)) {
          if (updateComponentInTree(node.children)) {
            return true;
          }
        }
      }
      return false;
    };
    // console.log('addComponent', treeData);
    if (updateComponentInTree(treeData)) {
      this.treeDataSubject.next(treeData); // 通知所有订阅者
    }
  }
  // 添加组件到 treeData
  addComponent(
    componentType: string,
    pId: string | undefined = this.selectedComponentSubject.value?.id,
    cIndex?: number
  ) {
    console.log('componentType:', componentType);
    console.log('selectedComponent:', this.selectedComponentSubject.value);
    const newComponent = this.createNewComponent(componentType);
    if (!pId || pId === 'root') {
      this.addComponentInRoot(newComponent, cIndex);
    } else {
      this.addComponentInTreeData(newComponent, pId, cIndex);
    }
  }

  // 布局组件删到最后一个插槽是不是要删除该布局组件？
  removeEmptyLayouts = (nodes: any[]): boolean => {
    let hasChanged = false;
    // 从后往前遍历，以便安全地删除元素
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];

      // 首先递归检查子节点
      if (node.children && Array.isArray(node.children)) {
        if (this.removeEmptyLayouts(node.children)) {
          hasChanged = true;
        }
      }

      // 检查当前节点是否为 scrollLayout 且没有子节点
      if (
        [
          'scrollLayout',
          'listLayout',
          'columnLayout',
          'columnLayout1_1_1',
        ].includes(node.type) &&
        (!node.children || node.children.length === 0)
      ) {
        nodes.splice(i, 1);
        hasChanged = true;
      }
    }
    return hasChanged;
  };
  removeSortableItem() {
    const treeData = this.treeDataSubject.value;
    // 递归查找并更新
    function removeNode(nodes: any[]): boolean {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]?.id) {
          nodes.splice(i, 1); // 删除该节点
          return true;
        }
        if (nodes[i].children && Array.isArray(nodes[i].children)) {
          if (removeNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    }
    if (removeNode(treeData)) {
      // this.removeEmptyLayouts(treeData);
      // console.log(treeData);
      this.treeDataSubject.next(treeData); // 通知所有订阅者
    }
  }

  // 其他操作（如删除、更新等）可按需添加
  removeComponent(component: any) {
    const treeData = this.treeDataSubject.value;
    // 递归查找并更新
    function removeNode(nodes: any[]): boolean {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]?.id || nodes[i]?.id === component.id) {
          nodes.splice(i, 1); // 删除该节点
          return true;
        }
        if (nodes[i].children && Array.isArray(nodes[i].children)) {
          if (removeNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    }
    if (removeNode(treeData)) {
      // this.removeEmptyLayouts(treeData);
      // console.log(treeData);
      this.treeDataSubject.next(treeData); // 通知所有订阅者
    }
    // 清空选中组件
    if (
      this.selectedComponentSubject.value &&
      this.selectedComponentSubject.value.id === component.id
    ) {
      this.selectedComponentSubject.next(null); // 通知所有订阅者
    }
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
  createCloneComponent(component: any) {
    if (!component) {
      return null;
    }

    // 创建组件属性的深拷贝，以便不修改原始组件
    const clonedProperties = JSON.parse(JSON.stringify(component));

    // 删除旧的id，因为createNewItem会生成新的id
    delete clonedProperties.id;

    // 递归克隆子组件
    if (clonedProperties.children && Array.isArray(clonedProperties.children)) {
      clonedProperties.children = clonedProperties.children.map((child) =>
        this.createCloneComponent(child)
      );
    }

    // 使用createNewItem方法创建新组件，并将克隆的属性作为选项传入
    // createNewItem会生成新的id，并根据clonedProperties设置其他属性（包括递归克隆后的children）
    const newComponent = this.createNewComponent(
      component.type,
      clonedProperties
    );
    return newComponent;
  }
  cloneComponent(component: any, pId: string) {
    const newComponent = this.createCloneComponent(component);
    // console.log('cloneComponent', component, newComponent, pId);
    if (!pId || pId === 'root') {
      this.addComponentInRoot(newComponent);
    } else {
      this.addComponentInTreeData(newComponent, pId);
    }
  }
}
