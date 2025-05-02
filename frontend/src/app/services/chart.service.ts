import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private api = '/api/charts';
  constructor(private http: HttpClient) {}
  getSummary() { return this.http.get<any>(`${this.api}/summary`); }
  getReports() { return this.http.get<any>(`${this.api}/reports`); }
}