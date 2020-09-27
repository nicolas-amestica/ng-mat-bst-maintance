import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceTarjetaComponent } from './instance-tarjeta.component';

describe('InstanceTarjetaComponent', () => {
  let component: InstanceTarjetaComponent;
  let fixture: ComponentFixture<InstanceTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
