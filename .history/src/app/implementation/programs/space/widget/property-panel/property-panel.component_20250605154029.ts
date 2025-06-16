import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanvasDataService } from '../../services/canvas-data.service';
@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.less'],
})
export class PropertyPanelComponent implements OnInit, OnChanges {
  selectedComponent: any;
  @Output() closePanel = new EventEmitter<any>();
  propertyForm: FormGroup;
  lineSpaceOption = [
    {
      label: '0px',
      value: '0px',
    },
    {
      label: '4px',
      value: '4px',
    },
  ];
  internalSpaceOption = [
    {
      label: '0px',
      value: '0px',
    },
    {
      label: '4px',
      value: '4px',
    },
  ];
  borderRadiusOption = [
    {
      label: '0px',
      value: '0px',
    },
    {
      label: '4px',
      value: '4px',
    },
  ];
  backgroundTypeOption = [
    {
      label: '透明',
      value: 'transparent',
    },
    {
      label: '颜色',
      value: 'hasColor',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private canvasDataService: CanvasDataService
  ) {
    this.propertyForm = this.fb.group({
      backgroundType: [''],
      width: [''],
      height: [''],
      padding: [''],
      textContent: [''],
      fontSize: [''],
      fontWeight: [''],
      color: [''],
      backgroundColor: [''],
    });
  }

  watchChange() {
    if (this.selectedComponent) {
      console.log('selectedComponent:', this.selectedComponent);
      // 根据选中的组件类型加载不同的属性配置
      this.loadComponentProperties();
    }
  }

  loadComponentProperties(): void {
    // 基于组件类型设置不同的表单控件值
    const props = this.selectedComponent.properties || {
      backgroundType: 'transparent',
    };

    this.propertyForm.patchValue({
      name: this.selectedComponent.name || '',
      width: props.width || '',
      height: props.height || '',
      padding: props.padding || '',
      textContent: props.textContent || '',
      fontSize: props.fontSize || '',
      fontWeight: props.fontWeight || '',
      color: props.color || '',
      backgroundType: props.backgroundType || '',
    });
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
  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
      this.watchChange();
    });
  }
}
