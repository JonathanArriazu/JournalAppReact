import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';
import { loadNotes } from '../../helpers';
import { useSelector } from 'react-redux';

export const startNewNote = () => {
    return async(dispatch, getState) => {

        //Agregamos esta accion para setear el estado de isSaving de false a true
        //cuando se agrega una nueva nota, para deshabilitar el boton mientras
        //se termina de agregar.
        dispatch(savingNewNote());

        //uid => consigo el uid con el getState, lo cual me servira para
        // crear un path en donde se almacenaran las notas para cada usuario
        const {uid} = getState().auth;


        const newNote= { // => el id de la nota nos lo dara firebase
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Creamos la referencia al path donde queremos almacenar la nota
        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`));

        //Para insertarla:
        await setDoc(newDoc, newNote);
        //la nota ya se encuentra insertada en la DB con el path indicado arriba.
        //Le asignamos el id que firebase coloca, de la siguiente forma:
        newNote.id = newDoc.id;

        //Envio a la newNote como payload
        dispatch (addNewEmptyNote(newNote))
        //Envio la newNote a setActive para que cambie su estado a "activo"
        dispatch (setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        //Traigo las notas desde firebase DB:
        const notes = await loadNotes(uid);

        //Llamo a la accion que establece las notas de arriba en el array de notas del estado
        dispatch(setNotes(notes));
    }
}
