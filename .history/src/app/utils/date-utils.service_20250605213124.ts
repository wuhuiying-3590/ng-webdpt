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
  updatePropertyInNestedArray(array, targetId, propertyPath, newValue) {
    return array.map((item) => {
      if (Array.isArray(item)) {
        return this.updatePropertyInNestedArray(
          item,
          targetId,
          propertyPath,
          newValue
        );
      } else if (typeof item === 'object' && item !== null) {
        if (item.id === targetId) {
          // 找到目标对象，修改属性并返回新的对象
          const updatedItem = { ...item }; // 使用展开运算符创建对象副本以避免修改原始数据
          updatedItem[propertyPath[0]] = newValue; // 修改属性
          return updatedItem;
        } else {
          // 递归处理嵌套的对象或数组
          return this.updatePropertyInNestedArray(
            Object.keys(item).map((key) => item[key]),
            targetId,
            propertyPath,
            newValue
          );
        }
      } else {
        // 直接返回非对象的元素
        return item;
      }
    });
  }
}
