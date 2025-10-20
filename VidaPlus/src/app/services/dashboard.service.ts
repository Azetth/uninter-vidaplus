import { Injectable } from '@angular/core';
import { SchedulingService } from './scheduling.service';
import { TeleconsultationService } from './teleconsultation.service';
import { Appointment } from './scheduling.service';
import { Teleconsultation } from './teleconsultation.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private schedulingService: SchedulingService,
    private teleconsultationService: TeleconsultationService
  ) { }

  getTotalAppointments(): number {
    const regularAppointments = this.schedulingService.getAppointments().length;
    const teleconsultations = this.teleconsultationService.getTeleconsultations().length;
    return regularAppointments + teleconsultations;
  }

  getUpcomingAppointments(): (Appointment | Teleconsultation)[] {
    const allAppointments: (Appointment | Teleconsultation)[] = [
      ...this.schedulingService.getAppointments(),
      ...this.teleconsultationService.getTeleconsultations()
    ];

    const now = new Date();
    return allAppointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.time}`);
      return appDate > now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getCompletedAppointments(): (Appointment | Teleconsultation)[] {
    const allAppointments: (Appointment | Teleconsultation)[] = [
      ...this.schedulingService.getAppointments(),
      ...this.teleconsultationService.getTeleconsultations()
    ];

    const now = new Date();
    return allAppointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.time}`);
      return appDate <= now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }
}
