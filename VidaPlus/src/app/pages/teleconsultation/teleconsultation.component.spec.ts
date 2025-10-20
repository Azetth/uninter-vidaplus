import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TeleconsultationComponent } from './teleconsultation.component';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('TeleconsultationComponent', () => {
  let component: TeleconsultationComponent;
  let fixture: ComponentFixture<TeleconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TeleconsultationComponent,
        FormsModule,
        SharedModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeleconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the form when clearForm is called', () => {
    component.teleconsultation = {
      patientId: 1,
      doctorId: 1,
      date: new Date(),
      time: '10:00',
      zoomLink: 'https://zoom.us/j/1234567890',
    };
    component.clearForm();
    expect(component.teleconsultation.patientId).toBeNull();
    expect(component.teleconsultation.zoomLink).toBe('');
  });

  it('should log teleconsultation data and clear form on scheduleTeleconsultation', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    spyOn(component, 'clearForm');

    component.teleconsultation = {
      patientId: 1,
      doctorId: 1,
      date: new Date(2025, 10, 20),
      time: '10:00',
      zoomLink: 'https://zoom.us/j/1234567890',
    };
    component.scheduleTeleconsultation();

    expect(console.log).toHaveBeenCalledWith('Agendamento de Teleconsulta:', {
      patientId: 1,
      doctorId: 1,
      date: new Date(2025, 10, 20),
      time: '10:00',
      zoomLink: 'https://zoom.us/j/1234567890',
    });
    expect(window.alert).toHaveBeenCalledWith('Teleconsulta agendada com sucesso!');
    expect(component.clearForm).toHaveBeenCalled();
  });
});
