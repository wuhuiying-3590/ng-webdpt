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
  // 转换为可编辑组件的函数
  convertToEditableComponent(item, componentType) {
    // 清除原来的内容
    item.innerHTML = '';
    item.className = 'editor-component';

    // 添加拖动把手
    const handle = document.createElement('div');
    handle.className = 'component-handle';
    item.appendChild(handle);

    // 添加操作按钮
    const actions = document.createElement('div');
    actions.className = 'component-actions';
    actions.innerHTML = `
        <button class="action-btn" title="编辑">✏️</button>
        <button class="action-btn" title="复制">📋</button>
        <button class="action-btn" title="删除">🗑️</button>
    `;
    item.appendChild(actions);

    // 根据组件类型添加不同的内容
    let componentContent;
    // switch (componentType) {
    //   case 'text':
    //     componentContent = document.createElement('div');
    //     componentContent.className = 'component-text';
    //     componentContent.innerText = '这是一段文本，点击编辑';
    //     break;
    //   case 'button':
    //     componentContent = document.createElement('button');
    //     componentContent.className = 'component-button';
    //     componentContent.innerText = '按钮';
    //     break;
    //   case 'image':
    //     componentContent = document.createElement('div');
    //     componentContent.className = 'component-image';
    //     componentContent.innerText = '图片占位符';
    //     break;
    //   case 'input':
    //     componentContent = document.createElement('input');
    //     componentContent.className = 'component-input';
    //     componentContent.placeholder = '请输入...';
    //     break;
    //   case 'container':
    //     componentContent = document.createElement('div');
    //     componentContent.className = 'component-container';
    //     componentContent.style.minHeight = '100px';
    //     componentContent.style.border = '1px dashed #ddd';
    //     componentContent.style.padding = '10px';
    //     componentContent.innerText = '容器组件';

    //     // 容器内也可以拖拽组件
    //     new Sortable(componentContent, {
    //       group: {
    //         name: 'editor',
    //         put: ['components'],
    //       },
    //       animation: 150,
    //       ghostClass: 'ghost-item',
    //       onAdd: function (evt) {
    //         const newItem = evt.item;
    //         const newComponentType = newItem.getAttribute(
    //           'data-component-type'
    //         );
    //         this.convertToEditableComponent(newItem, newComponentType);
    //       },
    //     });
    //     break;
    //   // 其他组件类型...
    //   default:
    //     componentContent = document.createElement('div');
    //     componentContent.innerText = '未知组件类型';
    // }

    item.appendChild(componentContent);

    // 为操作按钮添加事件监听
    const deleteBtn = actions.querySelector('[title="删除"]');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function () {
        item.remove();
      });
    }

    // 为组件添加点击事件，激活编辑状态
    item.addEventListener('click', function (e) {
      // 防止点击操作按钮时触发
      if (!e.target.closest('.component-actions')) {
        // 移除其他组件的active状态
        document.querySelectorAll('.editor-component.active').forEach((el) => {
          if (el !== item) {
            el.classList.remove('active');
          }
        });

        // 切换当前组件的active状态
        item.classList.toggle('active');
      }
    });
  }
  sortableOptions = {
    group: {
      name: 'share',
      pull: true,
      put: true,
    },
    filter: '.no-drag',
    // 列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      console.log('onAdd', evt);
      // 获取拖拽过来的组件数据
      const item = evt.item;
      const componentType = item.getAttribute('data-component-type');
      console.log('onAdd', componentType);
      // 将拖入的组件转换为可编辑组件
      // this.convertToEditableComponent(item, componentType);
      // this.canvasDataService.addComponent(componentType);
    },
    // 列表单元拖放结束后的回调函数
    onEnd: (evt) => {
      console.log('onEnd', evt);
      const { item, from, to, oldIndex, newIndex } = evt;
      this.canvasDataService.updateComponent(
        item.dataset.cId,
        from.dataset.pId,
        to.dataset.pId,
        oldIndex,
        newIndex
      );
    },
  };
}
