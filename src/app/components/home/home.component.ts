import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {ContactModel} from '../../models/contact.model';
import {AgendaService} from '../../services/agenda.services';
import { concat } from 'rxjs';
import Swal from 'sweetalert2';
import {TypePhoneModel} from '../../models/type-phone.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AgendaService]
})

export class HomeComponent  {

  public titulo:string;
  public listContacts:ContactModel[];
  public objContact:ContactModel;
  public listTypePhoneModel:TypePhoneModel[];

  constructor(private _route:ActivatedRoute
              ,private _router:Router
              ,private _agendaService:AgendaService
              ) { 
    this.titulo = "Agenda de contactos";
    this.objContact= new ContactModel(null,null,null,null,null,null);
    this.GetAllTypePhone();
  }

  ngOnInit() {
    this.getAllContacts();
  }

  //Métdo para consultar todos los contactos 
  getAllContacts(){
    this._agendaService.getAllContacts().subscribe(result =>{
      this.listContacts = result;
    },
    error => {
        var errorMessaje = <any>error;
        console.log(errorMessaje);
    });
  }

  //Método para agregar un concato a la agenda
  AddContact(){
    console.log(this.objContact);
    this._agendaService.insertContact(this.objContact).subscribe(result =>{
        Swal.fire({
          allowOutsideClick: false,
          title: '!Alert',
          text: result.message
        });
    },
    error => {
        var errorMessaje = <any>error;
        console.log(errorMessaje);
    });
    //Actualiza Contacots 
    this.ngOnInit();
  }

  //Método para agregar un concato a la agenda
  UpdateContact(Concat:ContactModel){
    this.objContact.idContact = Concat.idContact;
    this.objContact.nombre = Concat.nombre;
    this.objContact.apellidos = Concat.apellidos;
    this.objContact.email = Concat.email;
    this.objContact.telefono = Concat.telefono;
    this.objContact.tipoTel = Concat.tipoTel;
  }

  //Método para confimar la actualizacion de datos 
  confirmInfoContact(){
      this._agendaService.UpdateContact(this.objContact).subscribe(result =>{
        Swal.fire({
          allowOutsideClick: false,
          title: '!Alert',
          text: result.message
        });
    },
    error => {
        var errorMessaje = <any>error;
        console.log(errorMessaje);
    });
    //Actualiza Contacots 
    this.ngOnInit();
  }

  //Método para eliminar un contacto por medio de su id
  deleteContact(idConcat:number){
    console.log(idConcat);
    this._agendaService.deleteContact(idConcat).subscribe(result =>{
        Swal.fire({
          allowOutsideClick: false,
          title: '!Alert',
          text: result.message
        });
    },
    error => {
        var errorMessaje = <any>error;
        console.log(errorMessaje);
    });
    //Actualiza Contacots 
    this.ngOnInit();
  }

  //Método para consultar los tipos de telefono 
  GetAllTypePhone(){
    this._agendaService.GetAllTypePhone().subscribe(result =>{
      this.listTypePhoneModel = result;
      console.log(this.listTypePhoneModel)
    },
    error => {
        var errorMessaje = <any>error;
        console.log(errorMessaje);
    });
  }

}
