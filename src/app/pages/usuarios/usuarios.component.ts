import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    console.log(termino);
    this.cargando = true;
    if (termino.length <= 2) {
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe((borrado: boolean) => {
              console.log(borrado);
              this.cargarUsuarios();
            });
        }
      });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}
