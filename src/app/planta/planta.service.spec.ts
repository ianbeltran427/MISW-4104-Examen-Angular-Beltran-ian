/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlantaService } from './planta.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';
import { Planta } from './planta';

describe('Service: Planta', () => {

  let service: PlantaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantaService],
    });
    service = TestBed.inject(PlantaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([PlantaService], (service: PlantaService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<Actors[]>', () => {
    const plantasMock: Array<Planta> = [];


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
      plantasMock.push(planta);
    }

    service.getPlantas().subscribe((plantas) => {
      expect(plantas.length).toBe(3);
      expect(plantas).toEqual(plantasMock);
    });

    const req = httpMock.expectOne('https://gist.githubusercontent.com/josejbocanegra/7b71922ee9e2ab407d3210f1e5cb8400/raw/cf1077fa69112bc67ff520dd6517a93afd3dae29/202212_MISW4104_Grupo2.json');
    expect(req.request.method).toBe('GET');
    req.flush(plantasMock);
  });

});
