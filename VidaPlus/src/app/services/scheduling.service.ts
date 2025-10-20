import { Injectable } from '@angular/core';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: any;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private appointments: Appointment[] = [];
  private nextId: number = 0;

  constructor() {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    const appointmentsJson = localStorage.getItem('appointments');
    if (appointmentsJson) {
      this.appointments = JSON.parse(appointmentsJson);
      this.nextId = this.appointments.length > 0 ? Math.max(...this.appointments.map(a => a.id)) + 1 : 1;
    } else {
      this.appointments = [];
      this.nextId = 1;
    }
  }

  private saveAppointments(): void {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    const newAppointment: Appointment = { ...appointment, id: this.nextId++ };
    this.appointments.push(newAppointment);
    this.saveAppointments();
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const index = this.appointments.findIndex(a => a.id === updatedAppointment.id);
    if (index > -1) {
      this.appointments[index] = updatedAppointment;
      this.saveAppointments();
    }
  }

  deleteAppointment(id: number): void {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.saveAppointments();
  }

  getAppointmentById(id: number): Appointment | undefined {
    return this.appointments.find(a => a.id === id);
  }
}
