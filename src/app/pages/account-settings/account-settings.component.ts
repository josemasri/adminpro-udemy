import { Component, OnInit} from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.aplicarCheck(this._ajustes.ajustes.tema);
  }

  cambiarColor(tema: string) {
    this.aplicarCheck(tema);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(tema: string) {
    document.querySelectorAll('.selector').forEach(elem => {
      elem.classList.remove('working');
      if (elem.getAttribute('data-theme') === tema) {
        elem.classList.add('working');
      }
    });
  }

}
