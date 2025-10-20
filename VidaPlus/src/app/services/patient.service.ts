import { Injectable } from '@angular/core';

export interface Patient {
  id?: number;
  fullName: string;
  dateOfBirth: string;
  cpf: string;
  address: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: Patient[] = [];
  private nextId: number = 0;

  constructor() {
    this.loadPatients();
  }

  private loadPatients(): void {
    const patientsJson = localStorage.getItem('patients');
    if (patientsJson) {
      this.patients = JSON.parse(patientsJson);
      this.nextId = this.patients.length > 0 ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
    } else {
      this.patients = [];
      this.nextId = 1;
    }
  }

  private savePatients(): void {
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }

  getPatients(): Patient[] {
    return [...this.patients];
  }

  addPatient(patient: Omit<Patient, 'id'>): void {
    const newPatient: Patient = { ...patient, id: this.nextId++ };
    this.patients.push(newPatient);
    this.savePatients();
  }

  updatePatient(updatedPatient: Patient): void {
    const index = this.patients.findIndex(p => p.id === updatedPatient.id);
    if (index > -1) {
      this.patients[index] = updatedPatient;
      this.savePatients();
    }
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter(p => p.id !== id);
    this.savePatients();
  }

  getPatientById(id: number): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }
}
