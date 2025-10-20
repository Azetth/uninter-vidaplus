import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        SharedModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on ngOnInit', () => {
    spyOn(component, 'loadDashboardData');
    component.ngOnInit();
    expect(component.loadDashboardData).toHaveBeenCalled();
  });

  it('should calculate appointment summaries correctly', () => {
    component['mockAppointments'] = [
      { id: 1, patientName: 'A', doctorName: 'Dr. X', date: new Date(2025, 10, 20), status: 'upcoming' },
      { id: 2, patientName: 'B', doctorName: 'Dr. Y', date: new Date(2025, 9, 15), status: 'completed' },
      { id: 3, patientName: 'C', doctorName: 'Dr. X', date: new Date(2025, 10, 22), status: 'upcoming' },
      { id: 4, patientName: 'D', doctorName: 'Dr. Z', date: new Date(2025, 10, 10), status: 'cancelled' },
    ];
    component.loadDashboardData();

    expect(component.totalAppointments).toBe(4);
    expect(component.upcomingAppointments).toBe(2);
    expect(component.completedAppointments).toBe(1);
  });

  it('should filter and sort next appointments correctly', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    component['mockAppointments'] = [
      { id: 1, patientName: 'Future', doctorName: 'Dr. F', date: tomorrow, status: 'upcoming' },
      { id: 2, patientName: 'Past', doctorName: 'Dr. P', date: yesterday, status: 'upcoming' },
      { id: 3, patientName: 'Completed', doctorName: 'Dr. C', date: tomorrow, status: 'completed' },
      { id: 4, patientName: 'Future 2', doctorName: 'Dr. F2', date: new Date(tomorrow.getTime() + 86400000), status: 'upcoming' }, // +1 day
      { id: 5, patientName: 'Future 3', doctorName: 'Dr. F3', date: new Date(tomorrow.getTime() + 172800000), status: 'upcoming' }, // +2 days
      { id: 6, patientName: 'Future 4', doctorName: 'Dr. F4', date: new Date(tomorrow.getTime() + 259200000), status: 'upcoming' }, // +3 days
    ];
    component.loadDashboardData();

    expect(component.nextAppointments.length).toBe(3);
    expect(component.nextAppointments[0].patientName).toBe('Future');
    expect(component.nextAppointments[1].patientName).toBe('Future 2');
    expect(component.nextAppointments[2].patientName).toBe('Future 3');
  });
});
