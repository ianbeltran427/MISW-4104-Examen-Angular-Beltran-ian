import { Component, OnInit } from '@angular/core';
import { Planta } from '../planta';
import { PlantaService } from '../planta.service';

@Component({
  selector: 'app-planta-list',
  templateUrl: './planta-list.component.html',
  styleUrls: ['./planta-list.component.css']
})
export class PlantaListComponent implements OnInit {

  plantas: Array<Planta> = [];
  conteoPlantasTipo: {
    interior: number;
    exterior: number;
  } = {
      interior: 0,
      exterior: 0
    };

  constructor(private plantaService: PlantaService) { }

  getPlantas(): void {
    this.plantaService.getPlantas().subscribe((plantas) => {
      this.plantas = plantas;
      this.contarPlantasTipo(plantas);
    });
  }

  contarPlantasTipo(plantas: Planta[]): void {
    this.conteoPlantasTipo = {
      interior: 0,
      exterior: 0
    };

    plantas.forEach((planta) => {
      if (planta.tipo === 'Interior') {
        this.conteoPlantasTipo.interior++;
      } else if (planta.tipo === 'Exterior') {
        this.conteoPlantasTipo.exterior++;
      }
    });
  }

  ngOnInit() {
    this.getPlantas();
  }

}
