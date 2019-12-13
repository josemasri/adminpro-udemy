import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

declare var swal: any;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    this.cargando = true;
    if (termino.length <= 2) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id)
            .subscribe((borrado: boolean) => {
              this.cargarHospitales();
            });
        }
      });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingresa el nombre',
      content: 'input',
      icon: 'info',
      className: 'bg-primary',
      buttons: true,
      dangerMode: true
    }).then((resp: string) => {
      if (resp) {
        if (resp.length > 2) {
          this._hospitalService.crearHospital(resp)
            .subscribe((creado: boolean) => {
              this.cargarHospitales();
            });
        } else {
          swal('Nombre demasiado corto', 'EL nombre del hospital es demasiado corto', 'error');
        }
      }
    });
  }

}
