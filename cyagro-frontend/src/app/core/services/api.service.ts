import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;
  private headers = new HttpHeaders({ 'X-API-Key': environment.apiKey });

  // -------- Cultivation Groups --------
  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/groups`, { headers: this.headers });
  }
  getGroup(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/groups/${id}`, { headers: this.headers });
  }
  createGroup(dto: any): Observable<any> {
    return this.http.post<any>(`${this.base}/groups`, dto, { headers: this.headers });
  }
  updateGroup(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.base}/groups/${id}`, dto, { headers: this.headers });
  }
  deleteGroup(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/groups/${id}`, { headers: this.headers });
  }

  // -------- Cultivations --------
  getCultivations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/cultivations`, { headers: this.headers });
  }
  getCultivation(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/cultivations/${id}`, { headers: this.headers });
  }
  createCultivation(dto: any): Observable<any> {
    return this.http.post<any>(`${this.base}/cultivations`, dto, { headers: this.headers });
  }
  updateCultivation(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.base}/cultivations/${id}`, dto, { headers: this.headers });
  }
  deleteCultivation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/cultivations/${id}`, { headers: this.headers });
  }

  // -------- Varieties --------
  getVarieties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/varieties`, { headers: this.headers });
  }
  getVariety(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/varieties/${id}`, { headers: this.headers });
  }
  createVariety(dto: any): Observable<any> {
    return this.http.post<any>(`${this.base}/varieties`, dto, { headers: this.headers });
  }
  updateVariety(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.base}/varieties/${id}`, dto, { headers: this.headers });
  }
  deleteVariety(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/varieties/${id}`, { headers: this.headers });
  }

  // -------- Harmful Causes --------
  getHarmfulCauses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/harmful_causes`, { headers: this.headers });
  }
  getHarmfulCause(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/harmful_causes/${id}`, { headers: this.headers });
  }
  createHarmfulCause(dto: any): Observable<any> {
    return this.http.post<any>(`${this.base}/harmful_causes`, dto, { headers: this.headers });
  }
  updateHarmfulCause(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.base}/harmful_causes/${id}`, dto, { headers: this.headers });
  }
  deleteHarmfulCause(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/harmful_causes/${id}`, { headers: this.headers });
  }
}
