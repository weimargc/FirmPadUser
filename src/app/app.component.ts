import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('firmUserPad',{static:true}) SignaturePadElement:any;
  firmUserPad:any;
  firmaImg:any;
  constructor(){

  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
   this.firmUserPad = new  SignaturePad(this.SignaturePadElement.nativeElement);
  }

  changeColor() {
    const rojo = Math.round(Math.random() * 255);
    const verde = Math.round(Math.random() * 255);
    const azul = Math.round(Math.random() * 255);
    const color = 'rgb(' + rojo + ','+verde +','+azul+')';
    this.firmUserPad.pencColor = color;
  }

  cleanSignature() {
    this.firmUserPad.clear();
  }

  unDo(){
    const datos = this.firmUserPad.toData();
    if(datos){
      datos.pop();
      this.firmUserPad.fromData(datos);
    }    
  }

  downloadImage(dataURL:any, nombre:any){
    if(navigator.userAgent.indexOf('Safari')> -1 && navigator.userAgent.indexOf('Chrome') === -1){
      window.open(dataURL);
    }else{
      // Si es safari o Chrome
      const blob = this.URLtoBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombre;
      this.firmaImg = blob;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
  URLtoBlob(dataURL: any) {
    const partes = dataURL.split(';base64,');
    const contentType = partes[0].split(':')[1];
    const raw = window.atob(partes[1]);
    const rawL = raw.length;
    const array = new Uint8Array(rawL);
    for (let i = 0; i < rawL; i++) {
      array[i] = raw.charCodeAt(i);
      
    }

    return new Blob([array],{type:contentType});
  }

  savePng(){
    if(this.firmUserPad.isEmpty()){
      alert('Debe firmar el documento');
    }else{
      const u = this.firmUserPad.toDataURL();
      this.downloadImage(u,'Firma.png');
      this.firmaImg = u;
    }
  }

  saveJpg(){
    if(this.firmUserPad.isEmpty()){
      alert('Debe firmar el documento');
    }else{
      const u = this.firmUserPad.toDataURL();
      this.downloadImage(u,'Firma.jpg');
      this.firmaImg = u;
    }
  }

  saveSvg(){
    if(this.firmUserPad.isEmpty()){
      alert('Debe firmar el documento');
    }else{
      const u = this.firmUserPad.toDataURL('image/svg+xml');
      this.downloadImage(u,'Firma.svg');
      this.firmaImg = u;
    }
  }
 
}
