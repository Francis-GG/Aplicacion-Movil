import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Persona } from './persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private firestore: Firestore) { }

  getPersonas(): Observable<Persona[]> {
    const personasRef = collection(this.firestore,'usuarios');
    return collectionData(personasRef, {idField: 'id'}) as Observable<Persona[]>;
  }

  getPersonaById(id:string): Observable<Persona>{
    const personaRef = doc(this.firestore,`usuarios/${id}`);
    return docData(personaRef,{ idField: 'id'}) as Observable<Persona>;
  }

  addPersona(persona: Persona){
    persona.tarifa = getRandomArbitrary(1000, 6000);
    const personaRef = collection(this.firestore, 'usuarios');
    return addDoc(personaRef,persona);
  }

  updatePersona(persona: Persona){
    const personaRef = doc(this.firestore,`usuarios/${persona.id}`);
    return updateDoc(personaRef, 
      { 
        name: persona.name, 
        lastname: persona.lastname,  
        tipousuario: persona.tipousuario,
        email: persona.email,
        comuna: persona.comuna,
        image: persona.image,
        tarifa: getRandomArbitrary(1000, 6000)
      });
  }

  deletePersona(persona: Persona){
    const personaRef = doc(this.firestore,`usuarios/${persona.id}`);
    return deleteDoc(personaRef);
  }
}

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(0);
}
