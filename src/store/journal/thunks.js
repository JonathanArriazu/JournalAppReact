import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote } from './journalSlice';

export const startNewNote = () => {
    return async(dispatch, getState) => {

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
    }
}

