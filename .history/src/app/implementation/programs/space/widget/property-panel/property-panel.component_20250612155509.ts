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
  getLineSpaceOption,
  getInternalSpaceOption,
  borderRadiusOption,
  backgroundTypeOption,
  chooseColorList,
  positionXOption,
  positionYOption,
  fontWeightOption,
  fontSizeOption,
  textAlignOption,
  marginOption,
  borderTypeOption,
  modeOption,
  fixedSizeOption,
  buttonTypeOption,
  buttonWidthOption,
  actionTypeOption,
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
  getLineSpaceOption: (type: string) => any[] = getLineSpaceOption;
  getInternalSpaceOption: (type: string) => any[] = getInternalSpaceOption;
  borderRadiusOption = borderRadiusOption;
  backgroundTypeOption = backgroundTypeOption;
  chooseColorOption = chooseColorList;
  positionXOption = positionXOption;
  positionYOption = positionYOption;
  fontWeightOption = fontWeightOption;
  fontSizeOption = fontSizeOption;
  textAlignOption = textAlignOption;
  marginOption = marginOption;
  borderTypeOption = borderTypeOption;
  modeOption = modeOption;
  fixedSizeOption = fixedSizeOption;
  buttonTypeOption = buttonTypeOption;
  buttonWidthOption = buttonWidthOption;
  actionTypeOption = actionTypeOption;
  private destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private canvasDataService: CanvasDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.propertyForm = this.fb.group({
      backgroundType: [null],
      backgroundColor: [null],
      lineSpace: [null],
      internalSpace: [null],
      borderRadius: [null],
      positionX: [null],
      positionY: [null],
      color: [null],
      fontWeight: [null],
      fontSize: [null],
      textAlign: [null],
      lines: [null],
      cycleFlag: [null],
      marginTop: [null],
      marginBottom: [null],
      borderType: [null],
      mode: [null],
      fixedSize: [null],
      customWidth: [null],
      customHeight: [null],
      type: [null],
      width: [null],
      actionType: [null],
      disabledAfterOperation: [null],
      widthPx: [null],
    });
  }
  initData() {
    // this.getLineSpaceOption = getLineSpaceOption;
    // this.getInternalSpaceOption = getInternalSpaceOption;
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
    const props = JSON.parse(
      JSON.stringify(this.selectedComponent.style || {})
    );
    if (props.backgroundType) {
      if (props.backgroundType === 'transparent') {
        props.backgroundColor = null;
      } else {
        const temp = props.backgroundType;
        props.backgroundColor = temp;
        props.backgroundType = 'color';
      }
    }
    // this.propertyForm.patchValue({
    //   backgroundType: props.backgroundType || '',
    //   backgroundColor: props.backgroundColor,
    //   lineSpace: props.lineSpace || '',
    //   internalSpace: props.internalSpace || '',
    //   borderRadius: props.borderRadius || '',
    // });
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
  removeNullProperties(obj) {
    for (const key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
    return obj;
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
        const newValue = JSON.parse(JSON.stringify(value));
        // 这里执行你的业务逻辑
        console.log('表单值变化:', newValue);
        if (newValue.backgroundType === 'color') {
          newValue.backgroundType = newValue.backgroundColor;
          delete newValue.backgroundColor;
        }
        this.removeNullProperties(newValue);
        // console.log(newValue);
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
  getSelectedIcon(value) {
    const selected = borderTypeOption.find((el) => el.value === value);
    return selected.icon;
  }
  getBackgroundColorStyle(item) {
    return { backgroundColor: item.value };
  }
}
