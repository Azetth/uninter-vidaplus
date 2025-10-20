import { Injectable } from '@angular/core';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: Doctor[] = [];
  private nextId: number = 0;

  constructor() {
    this.loadDoctors();
    if (this.doctors.length === 0) {
      this.addDoctor({ name: 'Dr. Carlos Souza', specialty: 'Cardiologia' });
      this.addDoctor({ name: 'Dra. Ana Costa', specialty: 'Dermatologia' });
    }
  }

  private loadDoctors(): void {
    const doctorsJson = localStorage.getItem('doctors');
    if (doctorsJson) {
      this.doctors = JSON.parse(doctorsJson);
      this.nextId = this.doctors.length > 0 ? Math.max(...this.doctors.map(d => d.id)) + 1 : 1;
    } else {
      this.doctors = [];
      this.nextId = 1;
    }
  }

  private saveDoctors(): void {
    localStorage.setItem('doctors', JSON.stringify(this.doctors));
  }

  getDoctors(): Doctor[] {
    return [...this.doctors];
  }

  addDoctor(doctor: Omit<Doctor, 'id'>): void {
    const newDoctor: Doctor = { ...doctor, id: this.nextId++ };
    this.doctors.push(newDoctor);
    this.saveDoctors();
  }

  updateDoctor(updatedDoctor: Doctor): void {
    const index = this.doctors.findIndex(d => d.id === updatedDoctor.id);
    if (index > -1) {
      this.doctors[index] = updatedDoctor;
      this.saveDoctors();
    }
  }

  deleteDoctor(id: number): void {
    this.doctors = this.doctors.filter(d => d.id !== id);
    this.saveDoctors();
  }

  getDoctorById(id: number): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }
}
