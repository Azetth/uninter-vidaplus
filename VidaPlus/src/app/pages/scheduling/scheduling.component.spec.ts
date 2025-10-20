import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SchedulingComponent } from './scheduling.component';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('SchedulingComponent', () => {
  let component: SchedulingComponent;
  let fixture: ComponentFixture<SchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SchedulingComponent,
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

    fixture = TestBed.createComponent(SchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the form when clearForm is called', () => {
    component.appointment = {
      patientId: 1,
      doctorId: 1,
      date: new Date(),
      time: '10:00',
    };
    component.clearForm();
    expect(component.appointment.patientId).toBeNull();
    expect(component.appointment.date).toBeNull();
  });

  it('should log appointment data and clear form on scheduleAppointment', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    spyOn(component, 'clearForm');

    component.appointment = {
      patientId: 1,
      doctorId: 1,
      date: new Date(2025, 10, 20),
      time: '10:00',
    };
    component.scheduleAppointment();

    expect(console.log).toHaveBeenCalledWith('Agendamento:', {
      patientId: 1,
      doctorId: 1,
      date: new Date(2025, 10, 20),
      time: '10:00',
    });
    expect(window.alert).toHaveBeenCalledWith('Consulta agendada com sucesso!');
    expect(component.clearForm).toHaveBeenCalled();
  });
});
