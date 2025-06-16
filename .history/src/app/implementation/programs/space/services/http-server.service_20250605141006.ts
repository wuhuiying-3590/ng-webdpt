import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webStyleData } from './webData';
@Injectable({ providedIn: 'root' })
export class HttpServerService {
  constructor(private http: HttpClient) {}

  getWebStyleData(): Observable<any> {
    // 替换为你的真实接口地址
    // return this.http.get('/api/web-style-data');
    return webStyleData;
  }
}
