import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http: HttpClient = inject(HttpClient);

  getSchedules(): Observable<Schedule[]> {
    console.log('get schedule service');
    return this.http.get<Schedule[]>(`${environment.apiUrl}/schedules`);
  }

  // getSchedule(): Observable<Schedule[]> {
  //   return this.http.get<Schedule[]>(`${environment.apiUrl}/schedule`);
  // }

  updateSchedule(schedule: Partial<Schedule>): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/schedule/${schedule.id}`,
      schedule
    );
  }

  checkAccess(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/access`);
  }
}
