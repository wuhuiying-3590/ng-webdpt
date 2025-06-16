import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilsService } from '../../../../utils/date-utils.service';

interface UserType {
  label: string;
  value: string;
}
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less'],
})
export class LibraryComponent implements OnInit {
  validateForm!: FormGroup;
  usertypeOption: UserType[] = [
    { label: '用户1', value: '1' },
    { label: '用户2', value: '2' },
    { label: '用户3', value: '3' },
  ];
  isCollapse = true;
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService
  ) {}
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
  search(): void {
    console.log(this.validateForm.value);
    console.log(this.validateForm.controls);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const raw = this.validateForm.value;
      const rangePickerTime = this.dateUtilsService.formatDate(
        raw.rangePickerTime
      );
      const payload = {
        ...raw,
        rangePickerTime,
      };
      console.log('payload', payload);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          // 显示红色错误边框样式
          control.markAsDirty();
          // 重新校验
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      rangePickerTime: [[]],
      work: [null],
      usertype: [null],
    });
  }
}
