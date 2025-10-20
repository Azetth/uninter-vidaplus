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
import { Appointment, SchedulingService } from '../../services/scheduling.service';
import { Patient, PatientService } from '../../services/patient.service';
import { Doctor, DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-scheduling',
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
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss'
})
export class SchedulingComponent implements OnInit {

  patients: Patient[] = [];
  doctors: Doctor[] = [];

  appointment: Appointment = {
    patientId: null,
    doctorId: null,
    date: null,
    time: '',
    id: null,
  };

  constructor(private schedulingService: SchedulingService, private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
    this.doctors = this.doctorService.getDoctors();
  }

  scheduleAppointment() {
    if (this.appointment.patientId && this.appointment.doctorId && this.appointment.date && this.appointment.time) {
      const newAppointment: Omit<Appointment, 'id'> = {
        patientId: this.appointment.patientId,
        doctorId: this.appointment.doctorId,
        date: this.appointment.date.toISOString().split('T')[0],
        time: this.appointment.time,
      };
      this.schedulingService.addAppointment(newAppointment);
      alert('Consulta agendada com sucesso!');
      this.clearForm();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  clearForm() {
    this.appointment = {
      patientId: null,
      doctorId: null,
      date: null,
      time: '',
      id: null,
    };
  }
}
