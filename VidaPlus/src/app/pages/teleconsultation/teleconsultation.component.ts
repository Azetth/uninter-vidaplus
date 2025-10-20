import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Teleconsultation, TeleconsultationService } from '../../services/teleconsultation.service';
import { Patient, PatientService } from '../../services/patient.service';
import { Doctor, DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-teleconsultation',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './teleconsultation.component.html',
  styleUrl: './teleconsultation.component.scss'
})
export class TeleconsultationComponent implements OnInit {

  patients: Patient[] = [];
  doctors: Doctor[] = [];

  teleconsultation: Teleconsultation = {
    id: 0,
    patientId: null,
    doctorId: null,
    date: null,
    time: '',
    zoomLink: '',
  };

  constructor(private teleconsultationService: TeleconsultationService, private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
    this.doctors = this.doctorService.getDoctors();
  }

  scheduleTeleconsultation() {
    if (this.teleconsultation.patientId && this.teleconsultation.doctorId && this.teleconsultation.date && this.teleconsultation.time && this.teleconsultation.zoomLink) {
      const newTeleconsultation: Omit<Teleconsultation, 'id'> = {
        patientId: this.teleconsultation.patientId,
        doctorId: this.teleconsultation.doctorId,
        date: this.teleconsultation.date.toISOString().split('T')[0],
        time: this.teleconsultation.time,
        zoomLink: this.teleconsultation.zoomLink
      };
      this.teleconsultationService.addTeleconsultation(newTeleconsultation);
      alert('Teleconsulta agendada com sucesso!');
      this.clearForm();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  clearForm() {
    this.teleconsultation = {
      id: null,
      patientId: null,
      doctorId: null,
      date: null,
      time: '',
      zoomLink: '',
    };
  }
}
