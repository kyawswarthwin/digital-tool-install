import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbz_vvmzGQb7IEvTy6HUf_lDgTUPPp_dKFucDIXCkimKp4JOe5L8pQ13LpgG6MpwfzwV/exec';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  filter(sheet: string, value: string): Observable<any> {
    const params = new URLSearchParams({
      method: 'filter',
      params: JSON.stringify({
        sheet,
        filter: value,
      }),
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }
}
