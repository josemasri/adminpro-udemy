import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

declare var swal: any;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(desde: number = 0) {
    const url = `${URL_SERVICIOS}/medico?desde=${desde}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        }
        )
      );
  }

  cargarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medico)
      );
  }


  buscarMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medicos)
      );
  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url)
      .pipe(
        map(resp => {
          swal('Médico borrado', 'El médico ha sido eliminado correctamente', 'success');
          return true;
        })
      );
  }
  guardarMedico(medico: Medico) {
    if (medico._id) {
      // Actualizando
      const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;
      return this.http.put(url, medico)
        .pipe(
          map((resp: any) => {
            swal('Médico actualizado', medico.nombre, 'success');
            return resp.medico;
          })
        );
    } else {
      // Creando
      const url = `${URL_SERVICIOS}/medico?token=${this._usuarioService.token}`;
      return this.http.post(url, medico)
        .pipe(
          map((resp: any) => {
            swal('Médico creado', medico.nombre, 'success');
            return resp.medico;
          })
        );
    }

  }
}
