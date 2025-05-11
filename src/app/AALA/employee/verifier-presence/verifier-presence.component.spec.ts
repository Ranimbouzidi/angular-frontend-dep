import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierPresenceComponent } from './verifier-presence.component';

describe('VerifierPresenceComponent', () => {
  let component: VerifierPresenceComponent;
  let fixture: ComponentFixture<VerifierPresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifierPresenceComponent]
    });
    fixture = TestBed.createComponent(VerifierPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
