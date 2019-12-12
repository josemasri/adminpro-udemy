import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    if (!img) {
      return `${URL_SERVICIOS}/img/usuarios/xxx`;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    return `${URL_SERVICIOS}/img/${tipo}/${img}`;
  }

}
