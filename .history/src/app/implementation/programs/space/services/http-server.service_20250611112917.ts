import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { webStyleData } from './webData';
@Injectable({ providedIn: 'root' })
export class HttpServerService {
  constructor(private http: HttpClient) {}

  getTemplateData(id): Observable<any> {
    // 替换为你的真实接口地址
    return this.http.get(`/api/template?id=${id}`);
    // return webStyleData;
  }
  getTemplateList(): Observable<any> {
    return this.http.get('/api/template/list');
  }
  addTemplate({ id }): Observable<any> {
    return this.http.post('/api/template/add', { id });
  }
  deleteTemplate({ id }): Observable<any> {
    return this.http.post('/api/template/delete', { id });
  }

  saveTemplate({ id, webStyleData }): Observable<any> {
    return this.http.post('/api/template/save', { id, webStyleData });
  }
}
