import { URL_SERVICIOS } from './../../config/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  termino: string;
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.termino = params.termino;
    });
    this.buscar();
  }

  buscar() {
    const url = `${URL_SERVICIOS}/busqueda/todo/${this.termino}`;
    this.http.get(url)
      .subscribe((res: any) => {
        this.usuarios = res.usuarios;
        this.hospitales = res.hospitales;
        this.medicos = res.medicos;
      });
  }
}
