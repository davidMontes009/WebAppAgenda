import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

import {ContactModel} from '../models/contact.model';

const headers = new Headers({
    'accept': 'application/json',
    'Content-Type': 'application/json'
    ,'Access-Control-Allow-Origin':'*'
    ,'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT'
 });

 @Injectable({
    providedIn: 'root'
  })
  export class AgendaService {
    constructor(private _http:Http){

    }

    //Servicio para registrar un contacto a la agenda
    insertContact(objContact:ContactModel){
        //Crea un objeto de tipo auto con los tres puntos hace una replica de las propiedades del objeto auto sin tener que escribirlas todas
      let ConcatTemp:ContactModel = {
        ...objContact
    }
    //Borra la propiedad id del auto temp por que no se necesita en el put
    delete ConcatTemp.idContact;
       //convierete los parametros en tipo json 
      let params = JSON.stringify(ConcatTemp);
      //recupera el endPoint a utilizar 
      let endPoint = GLOBAL.url + GLOBAL.endPointAgenda.addContact;
      //Ejecuta servicio y devuelve el resultado 
      return this._http.post(endPoint
                              ,params
                              ,{headers}).map(resp => resp.json());
     }

     //Servicio para registrar un contacto a la agenda
    UpdateContact(objContact:ContactModel){
       //convierete los parametros en tipo json 
      let params = JSON.stringify(objContact);
      //recupera el endPoint a utilizar 
      let endPoint = GLOBAL.url + GLOBAL.endPointAgenda.updateContact;
      //Ejecuta servicio y devuelve el resultado 
      return this._http.put(endPoint
                              ,params
                              ,{headers}).map(resp => resp.json());
     }

     //Servicio para consultar todos los contactos
     getAllContacts(){
         let endPoint = GLOBAL.url + GLOBAL.endPointAgenda.getContacts;
        return this._http.get(endPoint,
                                {headers}).map(resp => resp.json()); 
    }

    //Servicio para eliminar un contacto 
    deleteContact(idContact:number){
        let endPoint = GLOBAL.url + GLOBAL.endPointAgenda.deleteContact;
        return this._http.delete(endPoint + idContact,
            {headers}).map(resp => resp.json());
    }

    //Servicio para consultar todos los tipos de teléfono
    GetAllTypePhone(){
        let endPoint = GLOBAL.url + GLOBAL.endPointAgenda.getAllTypePhone;
       return this._http.get(endPoint,
                               {headers}).map(resp => resp.json()); 
   }

  }
