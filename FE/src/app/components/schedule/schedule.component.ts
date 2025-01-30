import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Schedule } from '../../models/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { DayOfWeek } from '../../enums';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  imports: [FormsModule],
})
export class ScheduleComponent implements OnInit {
  days: string[] = [];
  schedules: Schedule[] = [];
  accessStatus: boolean | null = null;

  private scheduleService: ScheduleService = inject(ScheduleService);

  ngOnInit(): void {
    console.log('get schedule goinint');
    this.days = Object.keys(DayOfWeek).filter((key) => isNaN(Number(key)));
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.getSchedules().subscribe({
      next: (schedules: Schedule[]) => (this.schedules = schedules),
      error: (error) => console.error('Error loading schedules:', error),
    });
  }

  updateSchedule(dayIndex: number): void {
    const schedule = this.schedules[dayIndex];
    this.scheduleService
      .updateSchedule({
        id: schedule.id,
        day_of_week: dayIndex,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
      })
      .subscribe({
        next: () => console.log('Schedule updated successfully'),
        error: (error) => console.error('Error updating schedule:', error),
      });
  }
}
