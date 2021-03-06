import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;



import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { element } from 'protractor';



declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length >= 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '858801634880-9p5pd7b4m1u9t08m21qn70g65d47pt0u.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));


    });
  }

  // tslint:disable-next-line: no-shadowed-variable
  attachSignin( element: HTMLElement ) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard');
    });
  }


  ingresar(forma: NgForm) {
    // this.router.navigate(['/dashboard']);
    if (forma.invalid) {
      swal('Error', 'Revisa los campos', 'warning');
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(() => this.router.navigate(['/dashboard']));

  }

}
