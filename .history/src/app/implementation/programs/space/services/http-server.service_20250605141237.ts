import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webStyleData } from './webData';
@Injectable({ providedIn: 'root' })
export class HttpServerService {
  constructor(private http: HttpClient) {}

  getWebStyleData(): Observable<any> {
    // 替换为你的真实接口地址
    return this.http.get(
      '/api/template?id=3d9b416c-ee44-4eed-a59d-bdb424e8914e'
    );
    // return webStyleData;
  }
}
