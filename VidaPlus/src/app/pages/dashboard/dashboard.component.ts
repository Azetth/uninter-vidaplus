import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from '../../services/dashboard.service';
import { Patient, PatientService } from '../../services/patient.service';
import { Doctor, DoctorService } from '../../services/doctor.service';
import { Appointment } from '../../services/scheduling.service';
import { Teleconsultation } from '../../services/teleconsultation.service';

interface DisplayAppointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Consulta' | 'Teleconsulta';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  totalAppointments: number = 0;
  upcomingAppointments: number = 0;
  completedAppointments: number = 0;
  nextAppointments: DisplayAppointment[] = [];

  constructor(
    private dashboardService: DashboardService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.totalAppointments = this.dashboardService.getTotalAppointments();
    const upcoming = this.dashboardService.getUpcomingAppointments();
    this.upcomingAppointments = upcoming.length;
    this.completedAppointments = this.dashboardService.getCompletedAppointments().length;

    this.nextAppointments = upcoming.slice(0, 3).map(app => {
      const patient = this.patientService.getPatientById(app.patientId);
      const doctor = this.doctorService.getDoctorById(app.doctorId);

      return {
        id: app.id,
        patientName: patient ? patient.fullName : 'Desconhecido',
        doctorName: doctor ? doctor.name : 'Desconhecido',
        date: app.date,
        time: app.time,
        type: ('zoomLink' in app) ? 'Teleconsulta' : 'Consulta'
      };
    });
  }
}
