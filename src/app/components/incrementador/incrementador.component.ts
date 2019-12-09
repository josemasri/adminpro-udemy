import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
  }

  onChanges(newValue: number): void {
    // const elemHTML: any = document.getElementsByName('progreso')[0];

    // console.log(newValue);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue < 1) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = newValue;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number): void {
    this.progreso += valor;
    if (this.progreso < 0) {
      this.progreso = 0;
    }

    if (this.progreso > 100) {
      this.progreso = 100;
    }
    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
