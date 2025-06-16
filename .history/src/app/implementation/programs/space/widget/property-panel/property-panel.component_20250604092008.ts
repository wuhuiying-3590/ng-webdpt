// components/property-panel/property-panel.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.less'],
})
export class PropertyPanelComponent implements OnChanges {
  @Input() selectedComponent: any;

  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      name: [''],
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

  ngOnChanges(): void {
    if (this.selectedComponent) {
      // 根据选中的组件类型加载不同的属性配置
      this.loadComponentProperties();
    }
  }

  loadComponentProperties(): void {
    // 基于组件类型设置不同的表单控件值
    const props = this.selectedComponent.properties || {};

    this.propertyForm.patchValue({
      name: this.selectedComponent.name || '',
      width: props.width || '',
      height: props.height || '',
      padding: props.padding || '',
      textContent: props.textContent || '',
      fontSize: props.fontSize || '',
      fontWeight: props.fontWeight || '',
      color: props.color || '',
      backgroundColor: props.backgroundColor || '',
    });
  }

  saveProperties(): void {
    if (!this.selectedComponent) {
      return;
    }

    // 保存属性到组件对象
    this.selectedComponent.properties = {
      ...this.selectedComponent.properties,
      ...this.propertyForm.value,
    };

    console.log('属性已保存', this.selectedComponent);
  }
}
