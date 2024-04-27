/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlantaListComponent } from './planta-list.component';
import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';
import { PlantaService } from '../planta.service';
import { Planta } from '../planta';

describe('PlantaListComponent', () => {
  let component: PlantaListComponent;
  let fixture: ComponentFixture<PlantaListComponent>;
  let debug: DebugElement;

  let plantaService: PlantaService;
  let plantasMock: Array<Planta> = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlantaListComponent],
      providers: [PlantaService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantaListComponent);
    component = fixture.componentInstance;
    plantaService = TestBed.inject(PlantaService);

    for (let i = 0; i < 3; i++) {
      const planta = new Planta(
        faker.string.uuid(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.number.int(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
      );
      component.plantas.push(planta);
      plantasMock.push(planta);
    }
    spyOn(plantaService, 'getPlantas').and.returnValue(of(plantasMock));
    fixture.detectChanges();
    debug = fixture.debugElement
  });

  afterEach(() => {
    plantasMock = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have only one title', () => {
    expect(debug.queryAll(By.css('h1.tittle-heading'))).toHaveSize(1)
  });

  it('should have 3 tr', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(3)
  });

  it('should have four table header cells (th)', () => {
    const headerCells = debug.queryAll(By.css('thead th'));
    expect(headerCells.length).toBe(4);
  });

  it('should have the correct header text for the first column (#)', () => {
    const firstHeader = debug.query(By.css('thead th:nth-child(1)'));
    expect(firstHeader.nativeElement.textContent).toBe('#');
  });

  it('should have the correct header text for the second column (Nombre común)', () => {
    const secondHeader = debug.query(By.css('thead th:nth-child(2)'));
    expect(secondHeader.nativeElement.textContent).toBe('Nombre común');
  });

  it('should have the correct header text for the third column (Tipo)', () => {
    const thirdHeader = debug.query(By.css('thead th:nth-child(3)'));
    expect(thirdHeader.nativeElement.textContent).toBe('Tipo');
  });

  it('should have the correct header text for the fourth column (Clima)', () => {
    const fourthHeader = debug.query(By.css('thead th:nth-child(4)'));
    expect(fourthHeader.nativeElement.textContent).toBe('Clima');
  });

  it('should have all table header cells with the class h4', () => {
    const headerCells = debug.queryAll(By.css('thead th'));
    headerCells.forEach(cell => {
      expect(cell.nativeElement.classList).toContain('h4');
    });
  });

  it('should call getPlantas method of PlantaService on initialization', () => {
    expect(plantaService.getPlantas).toHaveBeenCalled();
  });

  it('should populate plantas array with data from PlantaService', () => {
    expect(component.plantas.length).toBe(3);
  });
});
