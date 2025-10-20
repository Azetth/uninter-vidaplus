import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { routes } from './app.routes';

describe('authGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
      ]
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should allow navigation if auth_token is present', () => {
    sessionStorage.setItem('auth_token', 'fake-jwt-token');
    const canActivate = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(canActivate).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if auth_token is not present', () => {
    sessionStorage.removeItem('auth_token');
    const canActivate = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
