import { Injectable } from '@angular/core';

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
}
