import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanvasDataService } from '../../services/canvas-data.service';
import {
  lineSpaceOptions,
  internalSpaceOptions,
  borderRadiusOptions,
  backgroundTypeOptions,
  chooseColorList,
  positionXOptions,
  positionYOptions,
} from '../constants/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.less'],
})
export class PropertyPanelComponent implements OnInit, OnDestroy {
  selectedComponent: any;
  @Output() closePanel = new EventEmitter<any>();
  skipFormChange = 0;
  propertyForm: FormGroup;
  lineSpaceOption = [];
  internalSpaceOption = [];
  borderRadiusOption = [];
  backgroundTypeOption = [];
  chooseColorOption = [];
  positionXOption = [];
  positionYOption = [];
  private destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private canvasDataService: CanvasDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.propertyForm = this.fb.group({
      backgroundType: [''],
      backgroundColor: [null],
      lineSpace: [''],
      internalSpace: [''],
      borderRadius: [''],
      positionX: [''],
      positionY: [''],
    });
  }
  initData() {
    this.lineSpaceOption = lineSpaceOptions;
    this.internalSpaceOption = internalSpaceOptions;
    this.borderRadiusOption = borderRadiusOptions;
    this.backgroundTypeOption = backgroundTypeOptions;
    this.chooseColorOption = chooseColorList;
    this.positionXOption = positionXOptions;
    this.positionYOption = positionYOptions;
  }
  watchChange() {
    if (this.selectedComponent) {
      console.log('selectedComponent:', this.selectedComponent);
      // 根据选中的组件类型加载不同的属性配置
      this.loadComponentProperties();
    }
  }

  loadComponentProperties(): void {
    this.skipFormChange = 2;
    // 先重置表单，清空之前的值
    this.propertyForm.reset();
    // 基于组件类型设置不同的表单控件值
    console.log('loadComponentProperties:', this.selectedComponent.style);
    const props = this.selectedComponent.style || {};
    if (props.backgroundType !== 'transparent') {
      const temp = props.backgroundType;
      props.backgroundColor = temp;
      props.backgroundType = 'color';
    } else {
      props.backgroundColor = null;
    }
    // this.propertyForm.patchValue({
    //   backgroundType: props.backgroundType || '',
    //   backgroundColor: props.backgroundColor,
    //   lineSpace: props.lineSpace || '',
    //   internalSpace: props.internalSpace || '',
    //   borderRadius: props.borderRadius || '',
    // });
    debuger;
    this.propertyForm.patchValue(props);
  }

  saveProperties(): void {
    console.log(11111);
    if (!this.selectedComponent) {
      return;
    }

    // 保存属性到组件对象
    // this.selectedComponent.properties = {
    //   ...this.selectedComponent.properties,
    //   ...this.propertyForm.value,
    // };
    console.log(this.propertyForm.value);
    console.log('属性已保存', this.selectedComponent);
  }
  handleClosePanel() {
    this.closePanel.emit();
  }

  backgroundTypeChange(type: string) {
    console.log('backgroundTypeChange', type);
    if (!type) {
      return;
    }
    if (type === 'transparent') {
      this.propertyForm.get('backgroundColor')?.setValue(null);
    } else if (type === 'color') {
      const backgroundColor = this.propertyForm.get('backgroundColor').value;
      // console.log(backgroundColor);
      // 否则默认选第一个颜色
      const firstColor = backgroundColor
        ? backgroundColor
        : this.chooseColorOption[0]?.value;
      this.propertyForm.get('backgroundColor')?.setValue(firstColor);
    }
  }
  // 添加槽位
  addSlot() {
    console.log('addSlot');
    this.canvasDataService.addComponent('slot');
  }
  // 删除槽位
  deleteSlot(component) {
    this.canvasDataService.removeComponent(component);
  }

  ngOnInit(): void {
    this.initData();
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
      this.watchChange();
    });

    // 监听整个表单的变化
    this.propertyForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (this.skipFormChange > 0) {
          this.skipFormChange--;
          return;
        }
        const newValue = { ...value };
        // 这里执行你的业务逻辑
        console.log('表单值变化:', newValue);
        if (newValue.backgroundType === 'color') {
          newValue.backgroundType = newValue.backgroundColor;
          delete newValue.backgroundColor;
        }
        if (this.selectedComponent) {
          this.canvasDataService.updateComponentStyle(
            this.selectedComponent.id,
            newValue
          );
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
