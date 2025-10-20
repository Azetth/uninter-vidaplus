import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PatientRegistrationComponent } from './patient-registration.component';
import { SharedModule } from '../../shared.module';

describe('PatientRegistrationComponent', () => {
  let component: PatientRegistrationComponent;
  let fixture: ComponentFixture<PatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PatientRegistrationComponent,
        FormsModule,
        SharedModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the form when clearForm is called', () => {
    component.patient = {
      fullName: 'Teste',
      dateOfBirth: '2000-01-01',
      cpf: '123.456.789-00',
      address: 'Rua Teste',
      phone: '11999999999',
      email: 'teste@example.com',
    };
    component.clearForm();
    expect(component.patient.fullName).toBe('');
    expect(component.patient.email).toBe('');
  });

  it('should log patient data and clear form on savePatient', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    spyOn(component, 'clearForm');

    component.patient = {
      fullName: 'Teste Salvar',
      dateOfBirth: '1990-05-10',
      cpf: '987.654.321-00',
      address: 'Av. Salvar',
      phone: '22888888888',
      email: 'salvar@example.com',
    };
    component.savePatient();

    expect(console.log).toHaveBeenCalledWith('Paciente Salvo:', {
      fullName: 'Teste Salvar',
      dateOfBirth: '1990-05-10',
      cpf: '987.654.321-00',
      address: 'Av. Salvar',
      phone: '22888888888',
      email: 'salvar@example.com',
    });
    expect(window.alert).toHaveBeenCalledWith('Paciente salvo com sucesso!');
    expect(component.clearForm).toHaveBeenCalled();
  });
});
