import { URL_SERVICIOS } from 'src/app/config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

declare var swal: any;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(desde: number = 0) {
    const url = `${URL_SERVICIOS}/hospital?desde=${desde}`;
    return this.http.get(url);
  }
  obtenerHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospital));
  }
  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url)
    .pipe(
      map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }
  crearHospital(nombre: string) {
    const url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;
    return this.http.post(url, { nombre, usuario: this._usuarioService.usuario._id })
      .pipe(
        map(resp => {
          swal('Hospital creado', 'El hospital ha sido eliminado correctamente', 'success');
          return true;
        })
      );
  }
  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospitales)
      );
  }
  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this._usuarioService.token}`;
    return this.http.put(url, hospital)
      .pipe(
        map((resp: any) => swal('Hospital actualizado', hospital.nombre, 'success'))
      );
  }
}
