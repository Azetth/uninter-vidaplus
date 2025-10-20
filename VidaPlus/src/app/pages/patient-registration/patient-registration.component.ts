import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { Patient, PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss'
})
export class PatientRegistrationComponent {
  patient: Patient = {
    fullName: '',
    dateOfBirth: '',
    cpf: '',
    address: '',
    phone: '',
    email: '',
  };

  constructor(private patientService: PatientService) { }

  savePatient() {
    this.patientService.addPatient(this.patient);
    alert('Paciente salvo com sucesso!');
    this.clearForm();
  }

  clearForm() {
    this.patient = {
      fullName: '',
      dateOfBirth: '',
      cpf: '',
      address: '',
      phone: '',
      email: '',
    };
  }
}
