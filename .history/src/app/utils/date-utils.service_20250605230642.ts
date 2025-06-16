import { Injectable } from '@angular/core';
import { format } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  constructor() {}
  formatDate(
    date: Date | Date[] | [],
    formatStr: string = 'yyyy-MM-dd HH:mm:ss'
  ): string | string[] | [] {
    if (!(date instanceof Date) && !Array.isArray(date)) {
      return date;
    }
    if (Array.isArray(date)) {
      if (date.length === 0) {
        return [];
      } else {
        return date.map((d) => {
          if (d instanceof Date) {
            return format(d, formatStr);
          }
          return d;
        });
      }
    }
    return format(date, formatStr);
  }
  updatePropertyInNestedArray(array, targetId, property, newValue) {
    return array.map((item) => {
      if (item.id === targetId) {
        // 找到目标对象，修改属性并返回新的对象
        const updatedItem = { ...item }; // 使用展开运算符创建对象副本以避免修改原始数据
        updatedItem[property] = newValue; // 修改属性
        return updatedItem;
      } else {
        if (item?.children && item?.children?.length > 0) {
          const childrenArr = [...item.children];
          return this.updatePropertyInNestedArray(
            childrenArr,
            targetId,
            property,
            newValue
          );
        } else {
          return item;
        }
      }
    });
  }
}
