import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../helpers';

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

export const startSaveNotes = () => {
    return async (dispatch, getState) => {
        
        //Mando a llamar setSaving para colocar isSaving en true
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        //La nota activa trae un id, pero yo no quiero enviar ese id a firestore, entonces:
        const noteToFireStore = {...note};
        delete noteToFireStore.id; // esto es JS: elimino el id del noteToFireStore

        //Creamos la referencia al documento
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        //Ahora seteamos el nuevo documento a enviar
        await setDoc(docRef, noteToFireStore, {merge: true});
        //El merge sirve para permitir realizar la union cuando hay campos que existen en
        //firestore y no en lo que estoy enviando, para que no se eliminen o den error, sino que 
        // mantenga y una todo

        //llamamos a updateNote el cual actualiza el listado de note que tenemos en el estado
        //ya que solamente estamos actualizando la nota activa pero no esa nota en el array de notes
        dispatch(updateNote(note))

    }
}
