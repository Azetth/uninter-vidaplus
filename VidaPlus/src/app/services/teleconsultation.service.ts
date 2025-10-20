import { Injectable } from '@angular/core';

export interface Teleconsultation {
  id: number;
  patientId: number;
  doctorId: number;
  date: any;
  time: string;
  zoomLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeleconsultationService {
  private teleconsultations: Teleconsultation[] = [];
  private nextId: number = 0;

  constructor() {
    this.loadTeleconsultations();
  }

  private loadTeleconsultations(): void {
    const teleconsultationsJson = localStorage.getItem('teleconsultations');
    if (teleconsultationsJson) {
      this.teleconsultations = JSON.parse(teleconsultationsJson);
      this.nextId = this.teleconsultations.length > 0 ? Math.max(...this.teleconsultations.map(t => t.id)) + 1 : 1;
    } else {
      this.teleconsultations = [];
      this.nextId = 1;
    }
  }

  private saveTeleconsultations(): void {
    localStorage.setItem('teleconsultations', JSON.stringify(this.teleconsultations));
  }

  getTeleconsultations(): Teleconsultation[] {
    return [...this.teleconsultations];
  }

  addTeleconsultation(teleconsultation: Omit<Teleconsultation, 'id'>): void {
    const newTeleconsultation: Teleconsultation = { ...teleconsultation, id: this.nextId++ };
    this.teleconsultations.push(newTeleconsultation);
    this.saveTeleconsultations();
  }

  updateTeleconsultation(updatedTeleconsultation: Teleconsultation): void {
    const index = this.teleconsultations.findIndex(t => t.id === updatedTeleconsultation.id);
    if (index > -1) {
      this.teleconsultations[index] = updatedTeleconsultation;
      this.saveTeleconsultations();
    }
  }

  deleteTeleconsultation(id: number): void {
    this.teleconsultations = this.teleconsultations.filter(t => t.id !== id);
    this.saveTeleconsultations();
  }

  getTeleconsultationById(id: number): Teleconsultation | undefined {
    return this.teleconsultations.find(t => t.id === id);
  }
}
